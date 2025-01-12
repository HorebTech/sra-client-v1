import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ObjetHttp } from "./Objet.http.service";
import { Credentials } from "../../models/Objet.model";

@Injectable({
    providedIn: 'root'
})
export class ObjetController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: ObjetHttp
    ){}

    Get(id: string) {
        return this.service.get(id).pipe(
            takeUntil(this.destroy$));
        }

    Gets() {
        return this.service.gets().pipe(
            takeUntil(this.destroy$));
        }

    GetsByStateAndOther(statut: string, numero: string) {
        return this.service.getByStateAndOther(statut, numero).pipe(
            takeUntil(this.destroy$));
        }

    Create(credentials: Credentials) {
        return this.service.create(credentials).pipe(
            takeUntil(this.destroy$));
        }

    Update(credentials: Credentials) {
        return this.service.updateState(credentials).pipe(
            takeUntil(this.destroy$));
        }

    UpdateState(id: string, statut: string) {
        return this.service.updateEtat(id, statut).pipe(
            takeUntil(this.destroy$));
        }

    Delete(id: string) {
        return this.service.remove(id).pipe(
            takeUntil(this.destroy$));
        }
}