import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { ChambreModel } from '../../../models/Chambre.model';
import { deleteChambre, getAllChambres, saveChambre, updateChambre } from '../../../store/Chambre/Chambre.action';
import { findGlobalChambres } from '../../../store/Chambre/Chambre.selector';
import { CategorieInterface } from '../../../models/Categorie.model';
import { StatutInterface } from '../../../models/Statut.model';
import { findCategories } from '../../../store/Categorie/Categorie.selector';
import { findStatuts } from '../../../store/Statut/Statut.selector';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chambres',
  standalone: false,
  templateUrl: './chambres.component.html',
  styleUrl: './chambres.component.scss'
})
export class ChambresComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  dataList!: ChambreModel[];
  objetToUpdate: ChambreModel | undefined;
  formGroup: UntypedFormGroup;
  openObjetDialog: boolean = false;

  categories!: CategorieInterface[];
  statuts!: StatutInterface[];

  satutSelected: string|undefined;

    constructor(
      protected fb: UntypedFormBuilder,
      protected messageService: MessageService,
      protected confirmationService: ConfirmationService,
      protected store: Store) {

        this.formGroup = this.fb.group({
          id: [null],
          numero: [null, Validators.required],
          localisation: [null, Validators.required],
          categorie: [null, Validators.required],
          statut: [null, Validators.required],
        });
      }

  ngOnInit(): void {
    this.store.dispatch(getAllChambres());
    this.store.select(findGlobalChambres).subscribe(
      item => this.dataList = item
    )
    this.store.select(findCategories).subscribe(
      item => this.categories = item
    )
    this.store.select(findStatuts).subscribe(
      item => this.statuts = item
    )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openUpdateObjet(Objet: ChambreModel){
    this.objetToUpdate = Objet;
    this.formGroup.patchValue({
        id: Objet.id,
        numero: Objet.numero,
        localisation: Objet.localisation,
        categorie: Objet.categorie?.nom,
        statut: Objet.statut?.nom,
    })
    this.openObjetDialog = true;
  }
  
  openSaveObjet(){
    this.formGroup.reset();
    this.objetToUpdate = undefined;
    this.openObjetDialog = true;
  }
  
  onSave() {
    if (this.objetToUpdate?.id != null || undefined) {
      this.store.dispatch(updateChambre({credentials: this.formGroup.value}));
    } else {
      this.store.dispatch(saveChambre({credentials: this.formGroup.value}));
    }
    this.openObjetDialog = false;
    this.formGroup.reset();
  }

  deleteObjet(local: ChambreModel | any) {
    this.confirmationService.confirm({
        message: 'Voulez-vous supprimer cette chambre ?',
        header: 'Confirmez la suppression',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        
        accept: () => {
            this.store.dispatch(deleteChambre({id: local.id as string}));
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Action annulée!' });
        }
    });
  }

}
