import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ConnexionComponent } from './dashboard/page/connexion/connexion.component';
import { AuthGuard } from './guard/auth.guard';
import { NotfoundComponent } from './dashboard/page/notfound/notfound.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled'
};

const routes: Routes = [
  {path: '', component: ConnexionComponent, data: { requiredAuth: false }, canActivate: [AuthGuard] },
  {
    path: 'dashboard', component: AppLayoutComponent, data: { requiredAuth: true }, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        data: {breadcrumb: 'Dashboard'},
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

