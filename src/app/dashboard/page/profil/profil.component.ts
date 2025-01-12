import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { AuthResponse, Utilisateur } from '../../../models/User.model';
import { getUserConnected } from '../../../store/Common/App.selector';
import { updateUtilisateur } from '../../../store/User/User.action';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profil',
  standalone: false,
  
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit, OnDestroy{
  private unsubscribe$ = new Subject<void>();
  constructor(
    private store: Store,
    private messageService: MessageService,
    private readonly fb: FormBuilder,
  ) {}

  user!: AuthResponse;

  url="";
  objetImage: any;
  onselectFile(event: any) {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];

    // Vérifie que c'est une image
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image.');
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event: any) => {
      // Redimensionne l'image à 100x100
      const resizedImage = await this.resizeImage(event.target.result, 100, 100);

      // Mets à jour les propriétés
      this.url = resizedImage.base64; // Base64 pour l'affichage
      this.objetImage = resizedImage.blob; // Blob pour l'envoi au serveur
    };

    reader.readAsDataURL(file);
  }
}

async resizeImage(base64: string, maxWidth: number, maxHeight: number): Promise<{ base64: string; blob: Blob }> {
  const img = new Image();
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      // Calculer les dimensions pour conserver l'aspect ratio
      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convertir en base64 avec compression
      const base64Compressed = canvas.toDataURL('image/jpeg', 0.8); // Qualité à 80%

      // Convertir en Blob
      fetch(base64Compressed)
        .then((res) => res.blob())
        .then((blob) => {
          resolve({ base64: base64Compressed, blob });
        })
        .catch(reject);
    };

    img.onerror = reject;
    img.src = base64;
  });
}

  profilForm = new FormGroup({
    nom: new FormControl(""),
    email: new FormControl(""),
    newPassword: new FormControl(""),
    photo: new FormControl(),
  });

  ngOnInit(): void {
    this.store.select(getUserConnected).subscribe(item => {
      this.user = item;
      this.profilForm.patchValue({
        nom: item.nom,
        email: item.email,
        newPassword: "",
        photo: item.photo
      })
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmitFormProfil(){
    const _obj: Utilisateur = {
      id: this.user.id,
      nom: this.profilForm.value.nom as string,
      email: this.profilForm.value.email as string,
      newPassword: this.profilForm.value.newPassword as string,
      photo: this.url,
    }
    if(this.url !== "" && this.objetImage.size > 1000000 ){
      this.messageService.add({ severity: 'error', summary: 'Oups !', detail: "L'image que vous avez choisit est très grande. Merci de choisir une image dont le poid est inférieur à 1 Mo !", life: 30000 })
    } else if((_obj.newPassword !== "" && _obj.newPassword!.length > 2) || (this.url !== "" && this.objetImage.size <= 1000000)) {
      this.store.dispatch(updateUtilisateur({ credentials: _obj as Utilisateur }));
    } else if((_obj.newPassword !== "" && (_obj.newPassword as string).length < 3)) {
      this.messageService.add({ severity: 'error', summary: 'Oups !', detail: 'Le mot de passe doit être supérieur à 2 caractères !', life: 30000 })
    }
  }

}
