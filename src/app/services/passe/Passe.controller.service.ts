import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { PasseHttp } from "./Passe.http.service";
import { Credentials } from "../../models/Passe.model";

@Injectable({
    providedIn: 'root'
})
export class PasseController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: PasseHttp
    ){}

    Gets() {
        return this.service.gets().pipe(
            takeUntil(this.destroy$));
        }
    
    GetByUserByState(agent: string, nom: string) {
        return this.service.getByStateAndUser(nom, agent).pipe(
            takeUntil(this.destroy$));
        }

    GetByStateByDateByUser(nom: string, agent: string, date: string) {
        return this.service.getByStateDateAndUser(nom, agent, date).pipe(
            takeUntil(this.destroy$));
        }
    
    GetCurrent(agent: string, date: string) {
        return this.service.getCurrent(agent, date).pipe(
            takeUntil(this.destroy$));
        }

    GetByState(nom: string) {
        return this.service.getByState(nom).pipe(
            takeUntil(this.destroy$));
        }

    Get(passeId: number) {
        return this.service.get(passeId).pipe(
            takeUntil(this.destroy$));
        }

    Create(credentials: Credentials) {
        return this.service.create(credentials).pipe(
            takeUntil(this.destroy$));
        }

    Update(credentials: Credentials) {
        return this.service.updatePasse(credentials).pipe(
            takeUntil(this.destroy$));
        }

    UpdateState(passeId: number, nom: string) {
        return this.service.updateState(passeId, nom).pipe(
            takeUntil(this.destroy$));
        }

    Delete(passeId: number) {
        return this.service.remove(passeId).pipe(
            takeUntil(this.destroy$));
        }
}