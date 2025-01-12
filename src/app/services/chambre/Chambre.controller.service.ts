import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ChambreHttp } from "./Chambre.http.service";
import { ChambreModel } from "../../models/Chambre.model";

@Injectable({
    providedIn: 'root'
})
export class ChambreController {
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: ChambreHttp
    ){}

    Get(id: string) {
        return this.service.getRoom(id).pipe(takeUntil(this.destroy$));
    }
    
    Gets() {
        return this.service.getRooms().pipe(takeUntil(this.destroy$));
    }
    
    Create(credentials: ChambreModel) {
        return this.service.create(credentials).pipe(takeUntil(this.destroy$));
    }

    UpdateState(id: string, etat: string) {
        return this.service.updateState(id, etat).pipe(takeUntil(this.destroy$));
    }

    Update(credentials: ChambreModel) {
        return this.service.updateRoom(credentials).pipe(takeUntil(this.destroy$));
    }

    GetByState(etat: string) {
        return this.service.getRoomsState(etat).pipe(takeUntil(this.destroy$));
    }

    Delete(id: string) {
        return this.service.deleteRoom(id).pipe(takeUntil(this.destroy$));
    }
}