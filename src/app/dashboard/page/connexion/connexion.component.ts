import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UserController } from '../../../services/user/User.controller.service';
import { MessageService } from 'primeng/api';
import { Utilisateur } from '../../../models/User.model';
import { beginLogin, passwordReset } from '../../../store/User/User.action';

@Component({
  selector: 'app-connexion',
  standalone: false,
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  activeStep: number = 1;

  userFound: boolean = false;
  isLoading: boolean = false; // Indicateur de chargement
  isLoadingConnexion: boolean = false; // Indicateur de chargement
  // private searchUserSubject: Subject<string> = new Subject<string>();

  private inputChangeSubject: Subject<string> = new Subject();

  showConnexionForm: boolean = true;
  showPasswordForm: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private store: Store,
    private messageService: MessageService,
    private readonly service: UserController
  ) {
  }

  public findUserByNameForm: FormGroup | any;
  public connexionForm: FormGroup | any;
  public passwordForm: FormGroup | any;

  ngOnInit(): void {
    this.findUserByNameForm = this.fb.group({
      nom: ["", [Validators.required]],
    });
    this.connexionForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(3)]],
    });
    this.passwordForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(3)]],
    });

    this.inputChangeSubject.pipe(
      debounceTime(800) // Attendre 300 ms après le dernier changement
    ).subscribe((nom) => {
      this.searchUser(nom);
    });
    
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

    // Méthode appelée à chaque changement dans le champ "nom"
    onNomInputChange(value: string): void {
      this.inputChangeSubject.next(value); // Émettre la nouvelle valeur
    }
    searchUser(nom: string): void {
      if (!nom.trim()) {
        this.messageService.add({ severity: 'error', summary: 'Oups!', detail: 'Vous devez saisir votre nom.' });
        return;
      }
  
      this.isLoading = true;
      // Exemple : Appeler un service pour rechercher l'utilisateur
      setTimeout(() => {
        this.isLoading = false; // Simuler la fin du chargement
        return this.service.FindUserByName(nom).subscribe({
          next : (data) => {
            if(data.statusCode == 200) {
              this.userFound = true;
            }
          },
          error : (error) => {
            this.userFound = false;
            this.messageService.add({ severity: 'error', summary: 'Oups!', detail: "Utilisateur inconnu." });
          }
        })
      }, 1000); // Simuler un délai de réponse
    }


  ChangeToPasswordForm() {
    this.showPasswordForm = true;
    this.connexionForm.reset();
    this.showConnexionForm = false
  }

  ChangeToConnexionForm() {
    this.showConnexionForm = true;
    this.connexionForm.reset();
    this.showPasswordForm = false;
  }

  connectedUser() {
    this.isLoadingConnexion = true;
    if(this.connexionForm.valid) {
      const _obj: Utilisateur = {
        nom: this.findUserByNameForm.value.nom,
        email: this.connexionForm.value.email,
        password: this.connexionForm.value.password
      }
      const _obj1: Utilisateur = {
        nom: this.findUserByNameForm.value.nom,
        email: this.connexionForm.value.email,
        newPassword: this.connexionForm.value.password
      }
      if(!this.showPasswordForm) {
        this.store.dispatch(beginLogin({credential: _obj}));
      } else {
        this.store.dispatch(passwordReset({credentials: _obj1}));
        this.ChangeToConnexionForm();
      }
    }
    this.isLoadingConnexion = false;
  }

}
