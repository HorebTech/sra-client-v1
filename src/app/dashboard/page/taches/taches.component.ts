import { Component, OnDestroy, OnInit } from '@angular/core';
import { TacheCredentials, TacheInterface } from '../../../models/Tache.model';
import { Subject } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormGroupColumn, TableColumn } from '../../model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { findTaches } from '../../../store/Tache/Tache.selector';
import { HttpResponse } from '@angular/common/http';
import { deleteTache, getAllTaches, saveTache, updateTache } from '../../../store/Tache/Tache.action';
import { CategorieInterface } from '../../../models/Categorie.model';
import { findCategories } from '../../../store/Categorie/Categorie.selector';

@Component({
  selector: 'app-taches',
  standalone: false,
  templateUrl: './taches.component.html',
  styleUrl: './taches.component.scss'
})
export class TachesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  dataList!: TacheInterface[];
  objetToUpdate: TacheInterface | undefined;
  formGroup: UntypedFormGroup;
  openObjetDialog: boolean = false;

  categories!: CategorieInterface[];

    constructor(
      protected fb: UntypedFormBuilder,
      protected messageService: MessageService,
      protected confirmationService: ConfirmationService,
      protected store: Store) {

        this.formGroup = this.fb.group({
          id: [null],
          action: [null, Validators.required],
          categorie: [null, Validators.required],
          sous_categorie: [null],
        });
      }

  ngOnInit(): void {
    this.store.dispatch(getAllTaches());
    this.store.select(findTaches).subscribe(
      item => this.dataList = item
    )
    this.store.select(findCategories).subscribe(
      item => this.categories = item
    )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openUpdateObjet(Objet: TacheInterface){
    this.objetToUpdate = Objet;
    this.formGroup.patchValue({
        id: Objet.id,
        action: Objet.action,
        categorie: Objet.categorie?.nom,
        sous_categorie: Objet.sous_categorie?.nom
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
      this.store.dispatch(updateTache({inputdata: this.formGroup.value}));
    } else {
      this.store.dispatch(saveTache({credential: this.formGroup.value}));
    }
    this.openObjetDialog = false;
    this.formGroup.reset();
  }

  deleteObjet(local: TacheInterface | any) {
    this.confirmationService.confirm({
        message: 'Voulez-vous supprimer cette tâche ?',
        header: 'Confirmez la suppression',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        
        accept: () => {
            this.store.dispatch(deleteTache({id: local.id as string}));
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Action annulée!' });
        }
    });
  }

}
