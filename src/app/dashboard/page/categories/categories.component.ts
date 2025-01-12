import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategorieInterface } from '../../../models/Categorie.model';
import { Subject } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormGroupColumn, TableColumn } from '../../model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { createCategorie, deleteCategorie, getCategories, updateCategorie } from '../../../store/Categorie/Categorie.action';
import { findCategories } from '../../../store/Categorie/Categorie.selector';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  dataList!: CategorieInterface[];
  objetToUpdate: CategorieInterface | undefined;
  formGroup: UntypedFormGroup;
  openObjetDialog: boolean = false;

    constructor(
      protected fb: UntypedFormBuilder,
      protected messageService: MessageService,
      protected confirmationService: ConfirmationService,
      protected store: Store) {

        this.formGroup = this.fb.group({
          id: [null],
          nom: [null, Validators.required],
        });
      }

  ngOnInit(): void {
    this.store.dispatch(getCategories());
    this.store.select(findCategories).subscribe(
      item => this.dataList = item
    )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openUpdateObjet(Objet: CategorieInterface){
    this.objetToUpdate = Objet;
    this.formGroup.patchValue({
        id: Objet.id,
        nom: Objet.nom
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
      this.store.dispatch(updateCategorie({inputdata: this.formGroup.value}));
    } else {
      this.store.dispatch(createCategorie({credential: this.formGroup.value}));
    }
    this.openObjetDialog = false;
    this.formGroup.reset();
  }

  deleteObjet(local: CategorieInterface | any) {
    this.confirmationService.confirm({
        message: 'Voulez-vous supprimer cette catégorie ?',
        header: 'Confirmez la suppression',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        
        accept: () => {
            this.store.dispatch(deleteCategorie({id: local.id as string}));
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Action annulée!' });
        }
    });
  }

}
