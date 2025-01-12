import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { PanneCredentials, PanneInterface } from '../../../models/Panne.model';
import { deletePanne, getAllPannes, updatePanne } from '../../../store/Panne/Panne.action';
import { getGlobalPannes } from '../../../store/Panne/Panne.selector';
import { StatutInterface } from '../../../models/Statut.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { getStatuts } from '../../../store/Statut/Statut.action';
import { findStatuts } from '../../../store/Statut/Statut.selector';
import { MarqueInterface } from '../../../models/Marque.model';
import { getMarques } from '../../../store/Marque/Marque.action';
import { findMarques } from '../../../store/Marque/Marque.selector';

@Component({
  selector: 'app-pannes',
  standalone: false,
  
  templateUrl: './pannes.component.html',
  styleUrl: './pannes.component.scss'
})
export class PannesComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    protected fb: UntypedFormBuilder,
    protected store: Store,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
) {
    this.panneFormGroup = this.fb.group({
      id: [null],
      description: [null, Validators.required],
      nomEquipement: [null, Validators.required],
      marqueEquipement: [null, Validators.required],
      statut: [null, Validators.required],
    });
}
  nosMarques!: MarqueInterface[];
  lesPannes!: PanneInterface[];
  selectedPanne!: PanneInterface;
  statuts!: StatutInterface[];
  panneFormGroup!: UntypedFormGroup;
  
  panneVisibility: boolean = false;

    ngOnInit(): void {
      this.store.dispatch(getAllPannes());
      this.store.select(getGlobalPannes).subscribe(
        data => this.lesPannes = data
      );

      this.store.dispatch(getMarques());
      this.store.select(findMarques).subscribe(item => {
        this.nosMarques = item;
      });

      this.store.dispatch(getStatuts());
      this.store.select(findStatuts).subscribe(
        item => this.statuts = item
      )
    }

    updatePanne(panne: PanneInterface) {
      this.panneFormGroup.patchValue({
        id: panne.id,
        description: panne.description,
        nomEquipement: panne.nomEquipement,
        marqueEquipement: panne.marqueEquipement?.nom,
        statut: panne.statut?.nom
    })
      this.panneVisibility = true;
    }

    deletePanne(panne: PanneInterface) {
      this.confirmationService.confirm({
        message: 'Voulez-vous supprimer cet élément ?',
        header: 'Confirmez la suppression',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        accept: () => {
          this.store.dispatch(deletePanne({id: panne.id as string}));
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Action annulée!' });
        }
      });
    }

    onSave() {
      if(this.panneFormGroup.valid) {
        const _obj: PanneCredentials = {
          id: this.panneFormGroup.value.id,
          description: this.panneFormGroup.value.description,
          marqueEquipement: this.panneFormGroup.value.marqueEquipement,
          nomEquipement: this.panneFormGroup.value.nomEquipement,
          statut: this.panneFormGroup.value.statut
        }
        this.store.dispatch(updatePanne({credentials: _obj}));
        this.panneVisibility = false;
      }
    }
  
    ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
  }

}
