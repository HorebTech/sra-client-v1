import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { deleteObjet, getAllObjets, updateObjet } from '../../../store/Objet/Objet.action';
import { getGlobalObjets } from '../../../store/Objet/Objet.selector';
import { Credentials, ObjetInterface } from '../../../models/Objet.model';
import { StatutInterface } from '../../../models/Statut.model';
import { getStatuts } from '../../../store/Statut/Statut.action';
import { findStatuts } from '../../../store/Statut/Statut.selector';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-objets',
  standalone: false,
  
  templateUrl: './objets.component.html',
  styleUrl: './objets.component.scss'
})
export class ObjetsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    protected fb: UntypedFormBuilder,
    protected store: Store,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
) {
  this.objetFormGroup = this.fb.group({
    id: [null],
    description: [null, Validators.required],
    statut: [null, Validators.required],
  });
}

lesObjets!: ObjetInterface[];
selectedObjet!: ObjetInterface;
statuts!: StatutInterface[];
objetFormGroup!: UntypedFormGroup;

objetVisibility: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(getAllObjets());
    this.store.select(getGlobalObjets).subscribe({
      next: (data) => {
        this.lesObjets = data;
      }
    });

    this.store.dispatch(getStatuts());
    this.store.select(findStatuts).subscribe(
      item => this.statuts = item
    )
  }

  updateObjet(objet: ObjetInterface) {
    this.objetFormGroup.patchValue({
      id: objet.id,
      description: objet.description,
      statut: objet.statut?.nom
  })
    this.objetVisibility = true;
  }

  onSave() {
    if(this.objetFormGroup.valid) {
      const _obj: Credentials = {
        id: this.objetFormGroup.value.id,
        description: this.objetFormGroup.value.description,
        statut: this.objetFormGroup.value.statut
      }
      this.store.dispatch(updateObjet({credentials: _obj}));
      this.objetVisibility = false;
    }
  }

  deleteObjet(objet: ObjetInterface) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer cet élément ?',
      header: 'Confirmez la suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.store.dispatch(deleteObjet({id: objet.id as string}));
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Action annulée!' });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
