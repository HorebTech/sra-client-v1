import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AuthGuard } from '../guard/auth.guard';
import { EtatsComponent } from './page/etats/etats.component';
import { CategoriesComponent } from './page/categories/categories.component';
import { ChambresComponent } from './page/chambres/chambres.component';
import { SallesComponent } from './page/salles/salles.component';
import { NettoyagesComponent } from './page/nettoyages/nettoyages.component';
import { TachesComponent } from './page/taches/taches.component';
import { PasseComponent } from './page/passe/passe.component';
import { ObjetsComponent } from './page/objets/objets.component';
import { PannesComponent } from './page/pannes/pannes.component';
import { UtilisateursComponent } from './page/utilisateurs/utilisateurs.component';
import { ProfilComponent } from './page/profil/profil.component';
import { AgentComponent } from './page/agent/agent.component';
import { MarquesComponent } from './page/marques/marques.component';

const routes: Routes = [
    {path: '', data: {breadcrumb: 'Accueil'}, component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'etats', data: {breadcrumb: 'Etats'}, component: EtatsComponent, canActivate: [AuthGuard]},
    {path: 'categories', data: {breadcrumb: 'Catégories'}, component: CategoriesComponent, canActivate: [AuthGuard]},
    {path: 'chambres', data: {breadcrumb: 'Chambres'}, component: ChambresComponent, canActivate: [AuthGuard]},
    {path: 'salles', data: {breadcrumb: 'Salles'}, component: SallesComponent, canActivate: [AuthGuard]},
    {path: 'nettoyages', data: {breadcrumb: 'Nettoyages'}, component: NettoyagesComponent, canActivate: [AuthGuard]},
    {path: 'taches', data: {breadcrumb: 'Tâches'}, component: TachesComponent, canActivate: [AuthGuard]},
    {path: 'passes', data: {breadcrumb: 'Passes'}, component: PasseComponent, canActivate: [AuthGuard]},
    {path: 'objets', data: {breadcrumb: 'Objets trouvés'}, component: ObjetsComponent, canActivate: [AuthGuard]},
    {path: 'pannes', data: {breadcrumb: 'Problemes techniques'}, component: PannesComponent, canActivate: [AuthGuard]},
    {path: 'utilisateur', data: {breadcrumb: 'Les utilisateurs'}, component: UtilisateursComponent, canActivate: [AuthGuard]},
    {path: 'profil', data: {breadcrumb: 'Profil'}, component: ProfilComponent, canActivate: [AuthGuard]},
    {path: 'agent', data: {breadcrumb: 'Agent'}, component: AgentComponent, canActivate: [AuthGuard]},
    {path: 'marque', data: {breadcrumb: 'Les marques de nos équipements'}, component: MarquesComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: '/notfound'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
