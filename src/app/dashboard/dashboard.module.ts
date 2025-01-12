import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { NgPrimeModule } from '../prime-ng.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ConnexionComponent } from './page/connexion/connexion.component';
import { AgentComponent } from './page/agent/agent.component';
import { CategoriesComponent } from './page/categories/categories.component';
import { EtatsComponent } from './page/etats/etats.component';
import { ChambresComponent } from './page/chambres/chambres.component';
import { SallesComponent } from './page/salles/salles.component';
import { NettoyagesComponent } from './page/nettoyages/nettoyages.component';
import { TachesComponent } from './page/taches/taches.component';
import { ObjetsComponent } from './page/objets/objets.component';
import { PannesComponent } from './page/pannes/pannes.component';
import { PasseComponent } from './page/passe/passe.component';
import { ProfilComponent } from './page/profil/profil.component';
import { UtilisateursComponent } from './page/utilisateurs/utilisateurs.component';
import { NotfoundComponent } from './page/notfound/notfound.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { StyleClassModule } from 'primeng/styleclass';
import { CheckerComponent } from './component/checker/checker.component';
import { CameraComponent } from './component/camera/camera.component';
import { WebcamModule } from 'ngx-webcam';
import { MarquesComponent } from './page/marques/marques.component';

@NgModule({
  declarations: [
    HomeComponent, 
    MarquesComponent, 
    ConnexionComponent, 
    AgentComponent, 
    CategoriesComponent, 
    EtatsComponent, 
    ChambresComponent, 
    SallesComponent, 
    NettoyagesComponent, 
    TachesComponent, 
    ObjetsComponent, 
    PannesComponent, 
    PasseComponent, 
    ProfilComponent, 
    UtilisateursComponent, 
    CheckerComponent,
    CameraComponent,
    NotfoundComponent
  ],
  imports: [
    JsonPipe,
    WebcamModule,
    CommonModule,
    NgPrimeModule,
    DashboardRoutingModule,
    DatePipe,
    StyleClassModule,
    OverlayPanelModule
  ]
})
export class DashboardModule { }