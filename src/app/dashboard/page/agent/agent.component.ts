import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ObjetInterface } from '../../../models/Objet.model';
import { PanneInterface } from '../../../models/Panne.model';
import { PasseInterface } from '../../../models/Passe.model';
import { AuthResponse } from '../../../models/User.model';
import { ChambreChoisieInterface } from '../../../models/ChambreChoisieModel.model';
import { getTodayDate } from '../../utils';
import { getUserConnected } from '../../../store/Common/App.selector';
import { combineLatest, filter, Subject, switchMap, tap } from 'rxjs';
import { getChambreChoisie, updateChambreChoisie } from '../../../store/Chambre/Chambre.action';
import { deleteObjet, getAllObjetsByStateAndOther, updateObjet, updateObjetState } from '../../../store/Objet/Objet.action';
import { findOneChambreChoisie } from '../../../store/Chambre/Chambre.selector';
import { getObjetsByStateOther } from '../../../store/Objet/Objet.selector';
import { getPannesByStateOther } from '../../../store/Panne/Panne.selector';
import { deletePanne, getAllPannesByStateAndOther, updatePanne, updatePanneState } from '../../../store/Panne/Panne.action';
import { findNewAndCurrentPasses, findPasseOne, updatePasseState } from '../../../store/Passe/Passe.action';
import { getNewPassesActif, getPasseOne, getUserPassesDay } from '../../../store/Passe/Passe.selector';

@Component({
  selector: 'app-agent',
  standalone: false,
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.scss'
})
export class AgentComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  constructor(
    private store: Store,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  
  viewObjets: boolean = false;
  loading: boolean = true;

  objetsFounded!: ObjetInterface[];
  pannesFounded!: PanneInterface[];

  viewPannes: boolean = false;
  isPanneLoading: boolean = true;

  viewTableVerification: boolean = false;

  mesPassesDuJour!: PasseInterface[];
  userConnected! : AuthResponse;

  monPasse!: PasseInterface;
  maChambreChoisie!: ChambreChoisieInterface;
  today = getTodayDate();

  ngOnInit(): void {
    this.initializeUserAndPasses();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initializeUserAndPasses(): void {
    this.store
      .select(getUserConnected)
      .pipe(
        filter(user => user.nom !== ''),
        tap(user => {
          this.userConnected = user;
          this.store.dispatch(findNewAndCurrentPasses({ agent: user.nom as string, date: this.today }));
        }),
        switchMap(() => this.store.select(getNewPassesActif))
      )
      .subscribe(passes => {
        (this.mesPassesDuJour = passes);
        this.loading = false;
      });
  }

  startVerification(passeId: number, chambre: ChambreChoisieInterface): void {
    this.store.dispatch(updateChambreChoisie({ id: chambre.id as string, credentials: {statut: "En cours"} }));
    this.store.dispatch(updatePasseState({ passeId, nom: "En cours" }));

    this.viewTableVerification = true;
    this.store.dispatch(findPasseOne({ id: passeId }));
    this.store.dispatch(getChambreChoisie({ id: chambre.id as string }));
    this.store.dispatch(getAllObjetsByStateAndOther({ statut: 'Nouveau', numero: chambre.chambre?.numero as string }));
    this.store.dispatch(getAllPannesByStateAndOther({ statut: 'Nouveau', numero: chambre.chambre?.numero as string }));

    combineLatest([
      this.store.select(findOneChambreChoisie),
      this.store.select(getPasseOne),
      this.store.select(getObjetsByStateOther),
      this.store.select(getPannesByStateOther)
    ]).subscribe({
      next: ([chambreChoisie, passe, objets, pannes]) => {
        this.maChambreChoisie = chambreChoisie;
        this.monPasse = passe;
        this.objetsFounded = objets;
        this.pannesFounded = pannes;
        
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Oups !',
          detail: 'Une erreur est survenue.',
          life: 30000
        });
      }
    });
  }

  compterChambresPropres(passe: PasseInterface): number {
    return passe.chambreChoisie?.filter(chambreChoisie => chambreChoisie.chambre?.statut?.nom !== "Propre").length as number;
  }

  toggleView(viewType: 'Objets' | 'Pannes'): void {
    if (viewType === 'Objets') this.viewObjets = !this.viewObjets;
    if (viewType === 'Pannes') this.viewPannes = !this.viewPannes;
  }

  confirm(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Avez-vous terminé votre vérification ?',
      icon: 'pi pi-exclamation-circle',
      accept: () => {
        this.completeVerification();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Oups !',
          detail: 'Confirmation annulée',
          life: 3000
        });
      }
    });
  }

  private completeVerification(): void {
    this.updateEntities(this.pannesFounded, updatePanneState, 'Enrégistré');
    this.updateEntities(this.objetsFounded, updateObjetState, 'Enrégistré');
    this.store.dispatch(updateChambreChoisie({ id: this.maChambreChoisie.id as string, credentials: {statut: "Propre"} }));

    let chambresPropres = this.compterChambresPropres(this.monPasse);
    if(chambresPropres == 1) {
      this.store.dispatch(updatePasseState({ passeId: this.monPasse.id as number, nom: 'Terminé' }));
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Succès !',
      detail: 'Vérification terminée',
      life: 30000
    });
    window.location.reload();
  }

  private updateEntities(entities: any[], action: Function, statut: string): void {
    entities.forEach(entity => {
      this.store.dispatch(action({ id: entity.id as string, statut }));
    });
  }

  removeObjet(objet: ObjetInterface): void {
    this.store.dispatch(deleteObjet({ id: objet.id as string }));
  }

  removePanne(panne: PanneInterface): void {
    this.store.dispatch(deletePanne({ id: panne.id as string }));
  }

}
