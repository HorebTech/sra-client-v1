import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { AuthResponse } from '../../../models/User.model';
import { PasseInterface } from '../../../models/Passe.model';
import { ChambreChoisieInterface } from '../../../models/ChambreChoisieModel.model';
import { TacheInterface } from '../../../models/Tache.model';
import { WebcamImage } from 'ngx-webcam';
import { getAllTaches } from '../../../store/Tache/Tache.action';
import { findTaches } from '../../../store/Tache/Tache.selector';
import { getUserConnected } from '../../../store/Common/App.selector';
import { findChambreOne, findOneChambreChoisie } from '../../../store/Chambre/Chambre.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../../models/Objet.model';
import { saveObjet } from '../../../store/Objet/Objet.action';
import { getTodayDate } from '../../utils';
import { PanneCredentials } from '../../../models/Panne.model';
import { savePanne } from '../../../store/Panne/Panne.action';
import { getPasseOne } from '../../../store/Passe/Passe.selector';
import { getMarques } from '../../../store/Marque/Marque.action';
import { MarqueInterface } from '../../../models/Marque.model';
import { findMarques } from '../../../store/Marque/Marque.selector';

@Component({
  selector: 'app-checker',
  standalone: false,
  templateUrl: './checker.component.html',
  styleUrl: './checker.component.scss'
})
export class CheckerComponent implements OnInit {

  constructor(
    private store: Store,
    private messageService: MessageService,
  ) {}
  value: number = 0;
  objetModalShow: boolean = false;
  loading: boolean = true;

  panneModalShow: boolean = false;
  isPanneLoading: boolean = true;

  userConnected! : AuthResponse;
  monPasse!: PasseInterface;
  maChambreChoisie!: ChambreChoisieInterface;

  TacheBain!: TacheInterface[];
  TacheChambre!: TacheInterface[];
  controles!: TacheInterface[];

  nosMarques!: MarqueInterface[];

  selectedTaches: any[] = [];

  webcamImage: WebcamImage | undefined;
  webcamAffiche: WebcamImage | undefined;

  // handleImage(webcamImage: WebcamImage | any) {
  //   this.webcamImage = webcamImage
  // }

  handleImage(webcamImage: WebcamImage | any) {
    this.webcamAffiche = webcamImage
    const base64 = webcamImage.imageAsBase64;
  
    // Convertir la base64 en taille (bytes)
    const sizeInBytes = this.getBase64Size(base64);
    const sizeInKB = sizeInBytes / 1024;
  
    if (sizeInKB > 500) {
      // Compresser si supérieur à 500 KB
      this.compressImage(base64, 800, 800, 0.8).then((compressedBase64) => {
        this.webcamImage = compressedBase64 as any;
      });
    } else {
      // Conserver l'image originale
      this.webcamImage = webcamImage.imageAsDataUrl;
    }
  }
  
  // Fonction pour obtenir la taille en bytes d'une image base64
  getBase64Size(base64: string): number {
    const stringLength = base64.length - (base64.indexOf(',') + 1);
    return 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
  }
  
  // Fonction de compression
  compressImage(base64: string, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `data:image/jpeg;base64,${base64}`;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        let width = img.width;
        let height = img.height;
  
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          } else {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality).split(',')[1]);
      };
    });
  }
  

  ngOnInit(): void {
    this.store.dispatch(getMarques());
    this.store.select(findMarques).subscribe(item => {
      this.nosMarques = item;
    });

    this.store.select(getUserConnected).subscribe(item => {
      this.userConnected = item;
    });
    this.store.select(findOneChambreChoisie).subscribe(item => {
      this.maChambreChoisie = item;
    });
    this.store.select(getPasseOne).subscribe(item => {
      this.monPasse = item;
    });
  }

  objetForm = new FormGroup({
    description: new FormControl("", Validators.required),
  });

  panneForm = new FormGroup({
    nomEquipement: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    marqueEquipement: new FormControl(""),
  });

  showDialogObjet() {
    this.loading = false
    this.objetModalShow = true;
    this.webcamImage = undefined
    this.webcamAffiche = undefined;
  }
  showDialogPanne() {
    this.loading = false
    this.panneModalShow = true;
    this.webcamImage = undefined
    this.webcamAffiche = undefined;
  }

  onSubmitObjet(){
    if(this.webcamAffiche === undefined) {
      this.messageService.add({ severity: 'error', summary: 'Oups !', detail: "Veuillez prendre une photo de l'objet", life: 30000 })
    } else if(!this.objetForm.valid) {
      this.messageService.add({ severity: 'error', summary: 'Oups !', detail: "Veuillez vérifier le nom et la description de l'objet trouvé", life: 30000 })
    } else {
      const _obj: Credentials = {
        id: this.maChambreChoisie.id,
        description: this.objetForm.value.description as string,
        imageBase64: this.webcamImage as any,
        statut: "Nouveau"
      }
      
      this.store.dispatch(saveObjet({credentials: _obj}));
      this.objetModalShow = false;
      this.webcamImage = undefined;
      this.webcamAffiche = undefined;
      this.objetForm.reset();
    }
  }

  onSubmitPanne() {
    if(this.webcamImage === undefined) {
      this.messageService.add({ severity: 'error', summary: 'Oups !', detail: "Veuillez prendre une photo de l'appareil en panne!", life: 30000 })
    } else if(!this.panneForm.valid) {
      this.messageService.add({ severity: 'error', summary: 'Oups !', detail: "Veuillez vérifier la description de l'appareil trouvé en panne", life: 30000 })
    } else {
      const date = getTodayDate();
      const _panne: PanneCredentials = {
        id: this.maChambreChoisie.id,
        description: this.panneForm.value.description as string,
        nomEquipement: this.panneForm.value.nomEquipement as string,
        date: date,
        marqueEquipement: this.panneForm.value.marqueEquipement as string,
        imageBase64: this.webcamImage as any,
        statut: "Nouveau"
      }
      // this.store.dispatch(loading({isLoading: true}));
      this.store.dispatch(savePanne({credentials: _panne}));
      this.panneModalShow = false;
      this.webcamImage = undefined;
      this.webcamAffiche = undefined;
      this.panneForm.reset();
    }
  }
  

}

