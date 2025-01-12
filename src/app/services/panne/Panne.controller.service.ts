import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { PanneHttp } from "./Panne.http.service";
import { PanneCredentials } from "../../models/Panne.model";

@Injectable({
    providedIn: 'root'
})
export class PanneController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: PanneHttp
    ){}

    Get(id: string) {
        return this.service.get(id).pipe(
            takeUntil(this.destroy$));
        }

    Gets() {
        return this.service.gets().pipe(
            takeUntil(this.destroy$));
        }

    GetsByDay(date: string) {
        return this.service.getByDay(date).pipe(
            takeUntil(this.destroy$));
        }

    GetsByDates(dateDebut: string, dateFin: string) {
        return this.service.getByDates(dateDebut, dateFin).pipe(
            takeUntil(this.destroy$));
        }
        
    GetsByStateAndOther(statut: string, numero: string) {
        return this.service.getByStateAndOther(statut, numero).pipe(
            takeUntil(this.destroy$));
        }

    GetRoomByDates() {
        return this.service.getRoomByDates().pipe(
            takeUntil(this.destroy$));
        }

    GetMaxPannesRommes() {
        return this.service.getMaxPannesRooms().pipe(
            takeUntil(this.destroy$));
        }

    Create(credentials: PanneCredentials) {
        return this.service.create(credentials).pipe(
            takeUntil(this.destroy$));
        }

    Update(credentials: PanneCredentials) {
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
    
    CounterByMarque() {
        return this.service.countByMarque().pipe(
            takeUntil(this.destroy$));
        }
}