import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormGroupColumn, TableColumn } from '../../model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { HttpResponse } from '@angular/common/http';
import { SalleInterface } from '../../../models/Salle.model';
import { deleteSalle, getAllSalles, saveSalle, updateSalle } from '../../../store/Salle/Salle.action';
import { findGlobalSalles } from '../../../store/Salle/Salle.selector';
import { CategorieInterface } from '../../../models/Categorie.model';
import { StatutInterface } from '../../../models/Statut.model';
import { findCategories } from '../../../store/Categorie/Categorie.selector';
import { findStatuts } from '../../../store/Statut/Statut.selector';

@Component({
  selector: 'app-salles',
  standalone: false,
  templateUrl: './salles.component.html',
  styleUrl: './salles.component.scss'
})
export class SallesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  dataList!: SalleInterface[];
  objetToUpdate: SalleInterface | undefined;
  formGroup: UntypedFormGroup;
  openObjetDialog: boolean = false;

  statuts!: StatutInterface[];

    constructor(
      protected fb: UntypedFormBuilder,
      protected messageService: MessageService,
      protected confirmationService: ConfirmationService,
      protected store: Store) {

        this.formGroup = this.fb.group({
          id: [null],
          numero: [null, Validators.required],
          description: [null, Validators.required],
          statut: [null, Validators.required],
        });
      }

  ngOnInit(): void {
    this.store.dispatch(getAllSalles());
    this.store.select(findGlobalSalles).subscribe(
      item => this.dataList = item
    )
    this.store.select(findStatuts).subscribe(
      item => this.statuts = item
    )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openUpdateObjet(Objet: SalleInterface){
    this.objetToUpdate = Objet;
    this.formGroup.patchValue({
        id: Objet.id,
        numero: Objet.numero,
        description: Objet.description,
        statut: Objet.statut?.nom
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
      this.store.dispatch(updateSalle({credentials: this.formGroup.value}));
    } else {
      this.store.dispatch(saveSalle({credentials: this.formGroup.value}));
    }
    this.openObjetDialog = false;
    this.formGroup.reset();
  }

  deleteObjet(local: SalleInterface | any) {
    this.confirmationService.confirm({
        message: 'Voulez-vous supprimer cette salle ?',
        header: 'Confirmez la suppression',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        
        accept: () => {
            this.store.dispatch(deleteSalle({id: local.id as string}));
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Action annulée!' });
        }
    });
  }

}
