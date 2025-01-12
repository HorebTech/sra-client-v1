import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserController } from '../services/user/User.controller.service';
import { AuthResponse, Utilisateur } from '../models/User.model';
import { getUserConnected } from '../store/Common/App.selector';
import { userConnected } from '../store/Common/App.action';

interface Breadcrumb {
    label: string;
    url?: string;
}

@Component({
    selector: 'app-breadcrumb',
    standalone: false,
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<void>();

    private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

    constructor(private router: Router,
        private service: UserController,
        private store: Store,
    ) {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(event => {
            const root = this.router.routerState.snapshot.root;
            const breadcrumbs: Breadcrumb[] = [];
            this.addBreadcrumb(root, [], breadcrumbs);

            this._breadcrumbs$.next(breadcrumbs);
        });
    }

    private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
        const routeUrl = parentUrl.concat(route.url.map(url => url.path));
        const breadcrumb = route.data['breadcrumb'];
        const parentBreadcrumb = route.parent && route.parent.data ? route.parent.data['breadcrumb'] : null;

        if (breadcrumb && breadcrumb !== parentBreadcrumb) {
            breadcrumbs.push({
                label: route.data['breadcrumb'],
                url: '/' + routeUrl.join('/')
            });
        }

        if (route.firstChild) {
            this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
        }
    }

    tokens!: AuthResponse;
    userConnected!: AuthResponse;

    ngOnInit() {
        if(localStorage.getItem('userdata') != null ) {
            let jsonstring = localStorage.getItem('userdata') as string;
            this.tokens = JSON.parse(jsonstring) as AuthResponse;
            this.store.dispatch(userConnected({nom: this.tokens.nom as string}))
          }
        this.store.select(getUserConnected).subscribe(item => {
            this.userConnected = item as AuthResponse;
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      }

    onLogout() {
        this.service.UserLogout(this.userConnected.email as string).subscribe({
            next: (data: any) => {
              if(data){
                localStorage.removeItem('userdata');
                window.location.href = '/'
              }
            },
            error: (error: any) => {
              console.log(error);
            }
        });
    }
}
