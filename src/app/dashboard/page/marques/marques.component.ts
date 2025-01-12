import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarqueInterface } from '../../../models/Marque.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { createMarque, deleteMarque, getMarques, updateMarque } from '../../../store/Marque/Marque.action';
import { findMarques } from '../../../store/Marque/Marque.selector';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-marques',
  standalone: false,
  templateUrl: './marques.component.html',
  styleUrl: './marques.component.scss'
})
export class MarquesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  dataList!: MarqueInterface[];
  objetToUpdate: MarqueInterface | undefined;
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
    this.store.dispatch(getMarques());
    this.store.select(findMarques).subscribe(
      item => this.dataList = item
    )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openUpdateObjet(Objet: MarqueInterface){
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
      this.store.dispatch(updateMarque({inputdata: this.formGroup.value}));
    } else {
      this.store.dispatch(createMarque({credential: this.formGroup.value}));
    }
    this.openObjetDialog = false;
    this.formGroup.reset();
  }

  deleteObjet(local: MarqueInterface | any) {
    this.confirmationService.confirm({
        message: 'Voulez-vous supprimer cette marque ?',
        header: 'Confirmez la suppression',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        
        accept: () => {
            this.store.dispatch(deleteMarque({id: local.id as string}));
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Action annulée!' });
        }
    });
  }

}
