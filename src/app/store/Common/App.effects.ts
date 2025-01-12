import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { MessageService } from "primeng/api";
import { emptyaction, showToast, userConnected, userConnectedSuccess } from "./App.action";
import { UserController } from "../../services/user/User.controller.service";
import { Router } from "@angular/router";

@Injectable()
export class AppEffect {

        route = inject(Router);
        service = inject(UserController);
        messageService = inject(MessageService);
        action$ = inject(Actions);

    _showtoast = createEffect(() =>
        this.action$.pipe(
            ofType(showToast),
            exhaustMap((action) => {
                this.showToast(action.severity, action.summary, action.detail, action.life)
                return of(emptyaction()); // Or dispatch another action
              })
        )
    )

    _uerConnected$ = createEffect(() =>
        this.action$.pipe(
            ofType(userConnected),
            switchMap((action) => {
                return this.service.FindUserByName(action.nom).pipe(
                    switchMap((data) => {
                        return of(
                            userConnectedSuccess({userConnected: data}),
                        );
                    })
                )
            })
        )
    );

    showToast(severity: string, summary: string, detail: string, life: number) {
        this.messageService.add({ severity, summary, detail, life});
    }
}