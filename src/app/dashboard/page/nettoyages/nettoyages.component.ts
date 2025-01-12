import { Component, OnDestroy, OnInit } from '@angular/core';
import { NettoyageCredentials, NettoyageInterface } from '../../../models/Nettoyage.model';
import { Subject } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormGroupColumn, TableColumn } from '../../model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { findNettoyages } from '../../../store/Nettoyage/Nettoyage.selector';
import { HttpResponse } from '@angular/common/http';
import { deleteNettoyage, getAllNettoyages, saveNettoyage, updateNettoyage } from '../../../store/Nettoyage/Nettoyage.action';
import { CategorieInterface } from '../../../models/Categorie.model';
import { findCategories } from '../../../store/Categorie/Categorie.selector';

@Component({
  selector: 'app-nettoyages',
  standalone: false,
  templateUrl: './nettoyages.component.html',
  styleUrl: './nettoyages.component.scss'
})
export class NettoyagesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  dataList!: NettoyageInterface[];
  objetToUpdate: NettoyageInterface | undefined;
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
        });
      }

  ngOnInit(): void {
    this.store.dispatch(getAllNettoyages());
    this.store.select(findNettoyages).subscribe(
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

  openUpdateObjet(Objet: NettoyageInterface){
    this.objetToUpdate = Objet;
    this.formGroup.patchValue({
        id: Objet.id,
        action: Objet.action,
        type: Objet.categorie?.nom,
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
      this.store.dispatch(updateNettoyage({inputdata: this.formGroup.value}));
    } else {
      this.store.dispatch(saveNettoyage({credential: this.formGroup.value}));
    }
    this.openObjetDialog = false;
    this.formGroup.reset();
  }

  deleteObjet(local: NettoyageInterface | any) {
    this.confirmationService.confirm({
        message: 'Voulez-vous supprimer ce nettoyage ?',
        header: 'Confirmez la suppression',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        
        accept: () => {
            this.store.dispatch(deleteNettoyage({id: local.id as string}));
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Action annulée!' });
        }
    });
  }

}
