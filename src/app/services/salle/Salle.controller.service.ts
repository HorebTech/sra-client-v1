import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { SalleHttp } from "./Salle.http.service";
import { SalleInterface } from "../../models/Salle.model";

@Injectable({
    providedIn: 'root'
})
export class SalleController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: SalleHttp
    ){}

    Get(id: string) {
        return this.service.get(id).pipe(
            takeUntil(this.destroy$));
        }

    Create(credentials: SalleInterface) {
        return this.service.create(credentials).pipe(
            takeUntil(this.destroy$));
        }

    UpdateState(id: string, etat: string) {
        return this.service.updateHallState(id, etat).pipe(
            takeUntil(this.destroy$));
        }

    Update(credentials: SalleInterface) {
        return this.service.updateHall(credentials).pipe(
            takeUntil(this.destroy$));
        }

    Gets() {
        return this.service.getHalls().pipe(
            takeUntil(this.destroy$));
        }

    GetByState(etat: string) {
        return this.service.getHallsState(etat).pipe(
            takeUntil(this.destroy$));
        }

    Delete(id: string) {
        return this.service.remove(id).pipe(
            takeUntil(this.destroy$));
        }
}