import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthResponse, Utilisateur } from '../../../models/User.model';
import { Subject } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DropdownSelector } from '../../model';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { getUserConnected } from '../../../store/Common/App.selector';
import { getUserlist } from '../../../store/User/User.Selectors';
import { beginRegister, deleteUtilisateur, getUtilisateurs, updateUtilisateurByAdmin } from '../../../store/User/User.action';

interface Role {
  name: string;
  code: string;
}

@Component({
  selector: 'app-utilisateurs',
  standalone: false,
  
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.scss'
})
export class UtilisateursComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  utilisateurs!: Utilisateur[];
  userConnected!: AuthResponse;

  roles: Role[] | undefined;
  selectedRole: Role | undefined;

  formGroup: UntypedFormGroup;
  searchValue: string | undefined;

  openUtilisateurDialog: boolean = false;
  userToUpdated: Utilisateur | undefined;

  dropdownList: DropdownSelector[]=[];
  selectedUtilisateurs!: Utilisateur;

  constructor(protected fb: UntypedFormBuilder,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected store: Store,
) {
  this.formGroup = this.fb.group({
    id: [null],
    nom: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(3)]],
    role: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getUtilisateurs());
    this.store.select(getUserlist).subscribe(
        item => this.utilisateurs = item
    )

    this.store.select(getUserConnected).subscribe(item => {
        this.userConnected = item;
    });

    this.roles = [
      { name: 'Femme de chambre', code: 'Agent' },
      { name: 'Admin', code: 'Admin' },
      { name: 'Manager', code: 'Manager' },
      { name: 'Gouvernante', code: 'Gouvernante' }
  ];
  
}

openUpdateUser(utilisateur: Utilisateur){
  this.userToUpdated = utilisateur;
  this.formGroup.patchValue({
      id: utilisateur.id,
      nom: utilisateur.nom,
      email: utilisateur.email,
      role: utilisateur.role,
      password: ""
  })
  this.openUtilisateurDialog = true;
}

openSaveUser(){
  this.formGroup.reset();
  this.userToUpdated = undefined;
  this.openUtilisateurDialog = true;
}

onSave() {
  if (this.userToUpdated?.id != null || undefined) {
    if(this.userConnected.id === this.userToUpdated?.id){
      this.messageService.add({ severity: 'error', summary: 'Action interdite', detail: "Vous ne pouvez pas effectuer cette action!", life: 10000 });
    } else {
      this.store.dispatch(updateUtilisateurByAdmin({credentials: this.formGroup.value}));
    }
  } else {
    this.store.dispatch(beginRegister({userdata: this.formGroup.value}));
  }
  this.openUtilisateurDialog = false;
  this.formGroup.reset();
}

deleteUser(utilisateur: Utilisateur) {
  this.confirmationService.confirm({
      message: 'Voulez-vous supprimer cet utilisateur ?',
      header: 'Confirmez la suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          if(this.userConnected.id === utilisateur.id) {
              this.messageService.add({ severity: 'error', summary: 'Action interdite', detail: "Vous ne pouvez pas supprimer cet utilisateur!", life: 10000 });
          } else {
              this.store.dispatch(deleteUtilisateur({id: utilisateur.id as string}));
          }
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Action annulée!' });
      }
  });
}

ngOnDestroy(): void {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}


}
