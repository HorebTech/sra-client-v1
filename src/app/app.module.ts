import { NgModule, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideStore, StoreModule } from '@ngrx/store';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  } from 'primeng/api';
import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { NgPrimeModule } from './prime-ng.module';
import { MyPreset } from './MyPreset';
import { AppLayoutModule } from './layout/app.layout.module';
import { DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserReducer } from './store/User/User.reducer';
import { AppReducer } from './store/Common/App.reducer';
import { AppEffect } from './store/Common/App.effects';
import { EffectsModule, provideEffects, USER_PROVIDED_EFFECTS } from '@ngrx/effects';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffect } from './store/User/User.effects';
import { AuthResponse } from './models/User.model';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { ShowDialogReducer } from './store/Dialog/Dialog.reducer';
import { CategorieReducer } from './store/Categorie/Categorie.reducer';
import { CategorieEffects } from './store/Categorie/Categorie.effects';
import { StatutReducer } from './store/Statut/Statut.reducer';
import { StatutEffects } from './store/Statut/Statut.effects';
import { ChambreChoisieReducer, ChambreReducer } from './store/Chambre/Chambre.reducer';
import { ChambreEffects } from './store/Chambre/Chambre.effects';
import { SalleChoisieReducer, SalleReducer } from './store/Salle/Salle.reducer';
import { SalleEffects } from './store/Salle/Salle.effects';
import { TacheChoisieReducer, TacheReducer } from './store/Tache/Tache.reducer';
import { TacheEffects } from './store/Tache/Tache.effects';
import { NettoyageChoisieReducer, NettoyageReducer } from './store/Nettoyage/Nettoyage.reducer';
import { NettoyageEffects } from './store/Nettoyage/Nettoyage.effects';
import { PasseReducer } from './store/Passe/Passe.reducer';
import { PasseEffects } from './store/Passe/Passe.effects';
import { PanneEffects } from './store/Panne/Panne.effects';
import { PanneReducer } from './store/Panne/Panne.reducer';
import { ObjetEffects } from './store/Objet/Objet.effects';
import { ObjetReducer } from './store/Objet/Objet.reducer';
import { MarqueReducer } from './store/Marque/Marque.reducer';
import { MarqueEffects } from './store/Marque/Marque.effects';
import { ServiceWorkerModule } from '@angular/service-worker';

export function tokenGetter() {
  const tokens = localStorage.getItem("userdata");
  if (tokens) {
    const parsedTokens = JSON.parse(tokens); // Convertir le JSON string en objet JavaScript
    return parsedTokens.accessToken; // Récupérer uniquement l'accessToken
  }
  return null; // Retourner null si aucun token n'est trouvé
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    ToastModule,
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    BrowserAnimationsModule,
    NgPrimeModule,
    StoreModule.forRoot({
      utilisateur: UserReducer, 
      app: AppReducer,
      categorie: CategorieReducer,
      marque: MarqueReducer,
      statut: StatutReducer,
      chambre: ChambreReducer,
      chambreChoisie: ChambreChoisieReducer,
      salle: SalleReducer,
      salleChoisie: SalleChoisieReducer,
      tache: TacheReducer,
      tacheChoisie: TacheChoisieReducer,
      nettoyage: NettoyageReducer,
      nettoyageChoisie: NettoyageChoisieReducer,
      passe: PasseReducer,
      panne: PanneReducer,
      objet: ObjetReducer,
      showDialog: ShowDialogReducer
    }),
    EffectsModule.forRoot([
      AppEffect, 
      UserEffect, 
      StatutEffects,
      CategorieEffects,
      MarqueEffects,
      ChambreEffects,
      SalleEffects,
      TacheEffects,
      PasseEffects,
      PanneEffects,
      ObjetEffects,
      NettoyageEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8086/api/v1/'],
          disallowedRoutes: ["http://localhost:8086/api/v1/auth/"],
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    MessageService,
    ConfirmationService,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    providePrimeNG({ 
      theme: {
        preset: MyPreset,
        options: {
          prefix: 'p',
          darkModeSelector: 'false',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
      },
      ripple: true,
      translation: {
        weak: "Faible",
        medium: "Moyen",
        strong: "Fort",
        passwordPrompt: "Entrez le mot de passe",
        emptySearchMessage: "Aucun contenu",
        emptyFilterMessage: "Aucun contenu",
        selectionMessage: "{0} éléments sélectionnés",
        emptySelectionMessage: "{0} aucun éléments sélectionnés"
      }
     }),
     { provide: LocationStrategy, useClass: PathLocationStrategy },
     DatePipe,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
