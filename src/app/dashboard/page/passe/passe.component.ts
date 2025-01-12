import { Component, OnDestroy, OnInit } from '@angular/core';
import { Credentials, PasseInterface, PasseModel } from '../../../models/Passe.model';
import { ChambreModel } from '../../../models/Chambre.model';
import { SalleInterface, SalleModel } from '../../../models/Salle.model';
import { Utilisateur } from '../../../models/User.model';
import { NettoyageInterface } from '../../../models/Nettoyage.model';
import { TacheInterface } from '../../../models/Tache.model';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { PasseController } from '../../../services/passe/Passe.controller.service';
import { ChambreChoisieController } from '../../../services/chambre/ChambreChoisie.controller.service';
import { SalleChoisieController } from '../../../services/salle/SalleChoisie.controller.service';
import { NettoyageChoisieController } from '../../../services/nettoyage/NettoyageChoisie.controller.service';
import { TacheChoisieController } from '../../../services/tache/TacheChoisie.controller.service';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { getAllChambres } from '../../../store/Chambre/Chambre.action';
import { findGlobalChambres } from '../../../store/Chambre/Chambre.selector';
import { getAllTaches } from '../../../store/Tache/Tache.action';
import { findTaches } from '../../../store/Tache/Tache.selector';
import { getAllNettoyages } from '../../../store/Nettoyage/Nettoyage.action';
import { findNettoyages } from '../../../store/Nettoyage/Nettoyage.selector';
import { getUtilisateurs } from '../../../store/User/User.action';
import { getUserlist } from '../../../store/User/User.Selectors';
import { ChambreChoisieCredentials, ChambreChoisieInterface } from '../../../models/ChambreChoisieModel.model';
import { CredentialTacheChoisie, TacheChoisieInterface } from '../../../models/TacheChoisieModel.model';
import { CredentialNettoyageChoisit, NettoyageChoisieInterface } from '../../../models/NettoyageChoisieModel.model';
import { EMPTY, forkJoin, Observable, Subject } from 'rxjs';
import { getAllSalles } from '../../../store/Salle/Salle.action';
import { findGlobalSalles } from '../../../store/Salle/Salle.selector';
import { SalleChoisieInterface } from '../../../models/SalleChoisieModel.model';
import { deletePasse, findGlobalPasses, findPasseOne } from '../../../store/Passe/Passe.action';
import { getGlobalPasses, getPasseOne } from '../../../store/Passe/Passe.selector';

@Component({
  selector: 'app-passe',
  standalone: false,
  
  templateUrl: './passe.component.html',
  styleUrl: './passe.component.scss'
})
export class PasseComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  passes!: PasseInterface[];
  passeForUpdate: PasseInterface | undefined;

  openPasseDialog: boolean = false;

  chambreDepart!: ChambreModel[];
  chambreRecouche!: ChambreModel[];
  travauxJournaliers!: TacheInterface[];
  autoControle!: TacheInterface[];
  petitPonctuel!: NettoyageInterface[];
  nettoyagePeriodique!: NettoyageInterface[];
  agents!: Utilisateur[];


  salles!: SalleInterface[];
  nettoyages!: NettoyageInterface;
  taches!: TacheInterface;

  activeIndex: number = 0;
  expandedRows = {};

  departOld: string[] | any;
  recoucheOld: string[] | any;
  sallesOld: string[] | any;
  travauxjournaliersOld: string[] | any;
  petitponctuelOld: string[] | any;
  nettoyageperiodiqueOld: string[] | any;
  autocontroleOld: string[] | any;

  constructor(
    protected fb: UntypedFormBuilder,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected store: Store,
    private datepipe: DatePipe,
    private passeService: PasseController,
    private chambreChoisieService: ChambreChoisieController,
    private salleChoisieService: SalleChoisieController,
    private nettoyageChoisieService: NettoyageChoisieController,
    private tacheChoisieService: TacheChoisieController
) {}

passeForm = new FormGroup({
  id: new FormControl(0),
  depart: new FormControl([]),
  recouche: new FormControl([]),
  travauxjournaliers: new FormControl([]),
  salles: new FormControl([]),
  autocontrole: new FormControl([]),
  petitponctuel: new FormControl([]),
  nettoyageperiodique: new FormControl([]),
  agent: new FormControl("", Validators.required),
  dateNettoyage: new FormControl("", Validators.required),
  commentaire: new FormControl("")
});

  ngOnInit(): void {
    this.store.dispatch(findGlobalPasses())
    this.store.select(getGlobalPasses).subscribe(
      item => this.passes = item
    )

    this.store.dispatch(getAllChambres());
    this.store.select(findGlobalChambres).subscribe(item => {
      this.chambreDepart = item.filter(chambre=> chambre.statut?.nom === 'Départ');
      this.chambreRecouche = item.filter(chambre=> chambre.statut?.nom === 'Recouche');
    });

    this.store.dispatch(getAllTaches());
    this.store.select(findTaches).subscribe(item => {
      this.travauxJournaliers = item.filter(tache=> tache.categorie?.nom === 'Travail Journalier');
      this.autoControle = item.filter(tache=> tache.categorie?.nom === 'Auto Contrôle');
    });

    this.store.dispatch(getAllNettoyages());
    this.store.select(findNettoyages).subscribe(item => {
      this.petitPonctuel = item.filter(nettoyage=> nettoyage.categorie?.nom === 'Petit Ponctuel');
      this.nettoyagePeriodique = item.filter(nettoyage=> nettoyage.categorie?.nom === 'Nettoyage Périodique');
    });

    this.store.dispatch(getAllSalles());
    this.store.select(findGlobalSalles).subscribe(item => {
      this.salles = item;
    });

    this.store.dispatch(getUtilisateurs());
    this.store.select(getUserlist).subscribe(item => {
        this.agents = item.filter(user=> user.role === 'Agent');
    })

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  openUpdatePasse(passe: PasseInterface) {
    this.store.dispatch(findPasseOne({ id: passe.id as number }));
  
    this.store.select(getPasseOne).subscribe((res) => {
  
      // Utilisation de fonctions auxiliaires pour éviter les répétitions
      const filterAndMap = <T>(array: T[], condition: (item: T) => boolean, mapFn: (item: T) => any) =>
        array?.filter(condition).map(mapFn) || [];

      const filterByCategorie = (array: any[], categorie: string, field: string) =>
        filterAndMap(array, (item) => item?.[field]?.categorie?.nom === categorie, (item) => item?.[field]?.action);
      
      const filterByStatut = (array: any[], statut: string) =>
        filterAndMap(array, (item) => item?.chambre?.statut?.nom === statut, (item) => item?.chambre?.numero);
      
      const filterAndMapOnly = <T>(array: T[], condition: (item: T) => boolean) =>
        array?.filter(condition) || [];

      const filterByCategorieOnly = (array: any[], categorie: string, field: string) =>
        filterAndMapOnly(array, (item) => item?.[field]?.categorie?.nom === categorie);

      const filterByStatutCompleted = (array: any[], statut: string) =>
        filterAndMapOnly(array, (item) => item?.chambre?.statut?.nom === statut);

      // Mise à jour des champs du formulaire
      this.openPasseDialog = true;
      this.passeForm.setValue({
        id: passe.id as number,
        depart: filterByStatut(res.chambreChoisie as ChambreChoisieInterface[], 'Départ') as any,
        recouche: filterByStatut(res.chambreChoisie as ChambreChoisieInterface[], 'Recouche') as any,
        autocontrole: filterByCategorie(res.tacheChoisie as TacheChoisieInterface[], 'Auto Contrôle', 'tache') as any,
        travauxjournaliers: filterByCategorie(res.tacheChoisie as TacheChoisieInterface[], 'Travail Journalier', 'tache') as any,
        nettoyageperiodique: filterByCategorie(res.nettoyageChoisie as NettoyageChoisieInterface[], 'Nettoyage périodique', 'nettoyage') as any,
        petitponctuel: filterByCategorie(res.nettoyageChoisie as NettoyageChoisieInterface[], 'Petit Ponctuel', 'nettoyage') as any,
        salles: filterAndMap(res.salleChoisie as SalleChoisieInterface[], () => true, (item) => item.salle?.numero) as any,
        agent: res.agent?.nom || '',
        dateNettoyage: res.dateNettoyage || '',
        commentaire: res.commentaire || ''
      });
  
      // Mise à jour des valeurs "anciennes" pour suivi
      this.passeForUpdate = res;
      this.departOld = filterByStatutCompleted(res.chambreChoisie as ChambreChoisieInterface[], 'Départ');
      this.recoucheOld = filterByStatutCompleted(res.chambreChoisie as ChambreChoisieInterface[], 'Recouche');
      this.autocontroleOld = filterByCategorieOnly(res.tacheChoisie as TacheChoisieInterface[], 'Auto Contrôle', 'tache');
      this.travauxjournaliersOld = filterByCategorieOnly(res.tacheChoisie as TacheChoisieInterface[], 'Travail Journalier', 'tache');
      this.nettoyageperiodiqueOld = filterByCategorieOnly(res.nettoyageChoisie as NettoyageChoisieInterface[], 'Nettoyage périodique', 'nettoyage');
      this.petitponctuelOld = filterByCategorieOnly(res.nettoyageChoisie as NettoyageChoisieInterface[], 'Petit Ponctuel', 'nettoyage');
      this.sallesOld = filterAndMapOnly(res.salleChoisie as SalleChoisieInterface[], () => true);
    });
  }
  

  deletePasse(passe: PasseInterface) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer ce passe ?',
      header: 'Confirmez la suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.store.dispatch(deletePasse({id: passe.id as number}));
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Action annulée!' });
      }
    });
  }

  openSavePasse(){
    this.openPasseDialog = true;
    this.passeForUpdate = undefined;
  }

  
  mergeArrays(x: any[], y: any[]): any[] {
    return [...(x || []), ...(y || [])];
  }
  
  onSave() {
    const {
      depart = [],
      recouche = [],
      travauxjournaliers = [],
      autocontrole = [],
      petitponctuel = [],
      nettoyageperiodique = [],
      salles = [],
      agent = "",
      dateNettoyage,
      commentaire = ""
    } = this.passeForm.value || {};
  
    if (!this.validateForm(agent!, dateNettoyage!)) return;
  
    const formattedDate = this.formatDate(dateNettoyage!);
    const chambresChoisies = this.mergeArrays(depart as string[], recouche as string[]);
    const tachesChoisies = this.mergeArrays(travauxjournaliers as string[], autocontrole as string[]);
    const nettoyagesChoisies = this.mergeArrays(petitponctuel as string[], nettoyageperiodique as string[]);
    const sallesChoisies = salles as string[];
  
    const passePayload: Credentials = {
      id: this.passeForUpdate?.id,
      agent: agent!,
      dateNettoyage: formattedDate,
      statut: "Nouveau",
      commentaire: commentaire as string
    };
  
    if (this.passeForUpdate?.id) {
      // Mise à jour
      this.passeService.Update(passePayload).subscribe({
        next: () => {
          this.processUpdateEntities(
            this.passeForUpdate?.id as number,
            chambresChoisies,
            tachesChoisies,
            nettoyagesChoisies,
            sallesChoisies
          );
        },
        error: (error) => this.handleError(error),
      });
    } else {
      this.passeService.Create(passePayload).subscribe({
        next: (passe) => this.processSubEntities(passe.id!, chambresChoisies, tachesChoisies, nettoyagesChoisies, sallesChoisies),
        error: (error) => this.handleError(error)
      });
    }
  }
  
  private validateForm(agent: string, dateNettoyage: string): boolean {
    if (!agent || !dateNettoyage) {
      const message = !agent
        ? "Vous devez choisir une femme de chambre."
        : "La date du jour est manquante.";
      this.messageService.add({ severity: 'error', summary: 'Oups !', detail: message, life: 10000 });
      return false;
    }
    return true;
  }
  
  private formatDate(dateNettoyage: string): string {
    return dateNettoyage.length === 10
      ? dateNettoyage
      : this.datepipe.transform(dateNettoyage, 'dd-MM-yyyy')!;
  }
  
  private processSubEntities(
    passeId: number,
    chambres: string[],
    taches: string[],
    nettoyages: string[],
    salles: string[],
  ): void {
    const requests = [
      ...this.createEntities(chambres, passeId, this.chambreChoisieService, "numero"),
      ...this.createEntities(taches, passeId, this.tacheChoisieService, "action"),
      ...this.createEntities(nettoyages, passeId, this.nettoyageChoisieService, "action"),
      ...this.createEntities(salles, passeId, this.salleChoisieService, "numero"),
    ];
  
    forkJoin(requests).subscribe({
      complete: () => this.finalizeSave(),
      error: (error) => this.handleError(error)
    });
  }
  
  private createEntities(
    items: string[],
    passeId: number,
    service: any,
    field: string
  ): Observable<any>[] {
    return items.map((item) => service.Create({ passeId, [field]: item }));
  }
  
  private finalizeSave(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès !',
      detail: 'Nouveau passe ajouté!'
    });
    this.resetForm();
    this.store.dispatch(findGlobalPasses());
  }
  
  private handleError(error: any): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Oups !',
      detail: error.error?.message || 'Une erreur est survenue.',
      life: 10000
    });
  }

  private resetForm(): void {
    this.passeForm.reset({
      id: 0,
      depart: [],
      recouche: [],
      travauxjournaliers: [],
      autocontrole: [],
      petitponctuel: [],
      nettoyageperiodique: [],
      salles: [],
      agent: "",
      dateNettoyage: "",
      commentaire: ""
    });
    this.openPasseDialog = false;
  }


  private processUpdateEntities(
    passeId: number,
    chambres: string[],
    taches: string[],
    nettoyages: string[],
    salles: string[]
  ): void {
    // Suppression des anciennes entités
    const deleteRequests = [
      ...this.deleteEntities(this.departOld || [], (id) => this.chambreChoisieService.Delete(id)),
      ...this.deleteEntities(this.recoucheOld || [], (id) => this.chambreChoisieService.Delete(id)),
      ...this.deleteEntities(this.travauxjournaliersOld || [], (id) => this.tacheChoisieService.Delete(id)),
      ...this.deleteEntities(this.autocontroleOld || [], (id) => this.tacheChoisieService.Delete(id)),
      ...this.deleteEntities(this.nettoyageperiodiqueOld || [], (id) => this.nettoyageChoisieService.Delete(id)),
      ...this.deleteEntities(this.petitponctuelOld || [], (id) => this.nettoyageChoisieService.Delete(id)),
      ...this.deleteEntities(this.sallesOld || [], (id) => this.salleChoisieService.Delete(id)),
    ];
  
    forkJoin(deleteRequests).subscribe({
      complete: () => {
        // Ajout des nouvelles entités
        this.processSubEntities(passeId, chambres, taches, nettoyages, salles);
      },
      error: (error) => this.handleError(error),
    });
  }
  
  private deleteEntities(items: any[], deleteFn: (id: string) => Observable<any>): Observable<any>[] {
    if (!items || items.length === 0) {
      console.warn('Aucune entité à supprimer.');
      return [];
    }
  
    return items.map((item) => {
      const id = item.id; // Supposons que chaque entité a un champ `id`
      if (!id) {
        console.error("L'entité ne contient pas de champ ID :", item);
        return EMPTY; // Si l'ID est absent, ignorer l'élément
      }
      return deleteFn(id);
    });
  }


  onRowExpand(event: TableRowExpandEvent) {
  }

  onRowCollapse(event: TableRowCollapseEvent) {
  }

}
