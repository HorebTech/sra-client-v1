import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthResponse } from '../models/User.model';
import { Store } from '@ngrx/store';
import { fetchmenu } from '../store/User/User.action';
import { userConnected } from '../store/Common/App.action';
import { getmenubyrole } from '../store/User/User.Selectors';
import { getUserConnected } from '../store/Common/App.selector';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-menu',
    standalone: false,
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<void>();

    constructor(
        private store: Store
      ) {}

      tokenReceived!: AuthResponse;
      userConnected!: AuthResponse;
      menulist: any[] = [];

      ngOnInit() {
        const userdata = localStorage.getItem('userdata');
        
        if (userdata) {
            this.tokenReceived = JSON.parse(userdata) as AuthResponse;
            this.store.dispatch(fetchmenu({ userrole: this.tokenReceived.role as string }));
            this.store.dispatch(userConnected({ nom: this.tokenReceived.nom as string }));
        }
    
        combineLatest([
            this.store.select(getmenubyrole),
            this.store.select(getUserConnected)
        ]).pipe(takeUntil(this.unsubscribe$)).subscribe(([menu, user]) => {
            this.menulist = menu;
            this.userConnected = user;
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
