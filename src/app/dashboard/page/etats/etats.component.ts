import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { findStatuts } from '../../../store/Statut/Statut.selector';
import { createStatut, deleteStatut, getStatuts, updateStatut } from '../../../store/Statut/Statut.action';
import { StatutInterface } from '../../../models/Statut.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-etats',
  standalone: false,
  templateUrl: './etats.component.html',
  styleUrl: './etats.component.scss'
})
export class EtatsComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<void>();

  dataList!: StatutInterface[];
  objetToUpdate: StatutInterface | undefined;
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
    this.store.dispatch(getStatuts());
    this.store.select(findStatuts).subscribe(
      item => this.dataList = item
    )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openUpdateObjet(Objet: StatutInterface){
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
      this.store.dispatch(updateStatut({inputdata: this.formGroup.value}));
    } else {
      this.store.dispatch(createStatut({credential: this.formGroup.value}));
    }
    this.openObjetDialog = false;
    this.formGroup.reset();
  }

  deleteObjet(local: StatutInterface | any) {
    this.confirmationService.confirm({
        message: 'Voulez-vous supprimer cet état ?',
        header: 'Confirmez la suppression',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        
        accept: () => {
            this.store.dispatch(deleteStatut({id: local.id as string}));
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Action annulée!' });
        }
    });
  }

}
