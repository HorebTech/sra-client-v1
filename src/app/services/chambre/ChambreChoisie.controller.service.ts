import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ChambreChoisieHttp } from "./ChambreChoisie.http.service";
import { ChambreChoisieCredentials, ChambreChoisieInterface } from "../../models/ChambreChoisieModel.model";

@Injectable({
    providedIn: 'root'
})
export class ChambreChoisieController {
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: ChambreChoisieHttp
    ){}

    Get(id: string) {
        return this.service.getChoosedRoom(id).pipe(takeUntil(this.destroy$));
    }
    
    Create(credentials: ChambreChoisieCredentials) {
        return this.service.create(credentials).pipe(takeUntil(this.destroy$));
    }
    
    Gets() {
        return this.service.getChoosedRooms().pipe(takeUntil(this.destroy$));
    }

    UpdateState(id: string, credentials: ChambreChoisieCredentials) {
        return this.service.updateChoosedRoom(id, credentials).pipe(takeUntil(this.destroy$));
    }

    Delete(id: string) {
        console.log("je veux voir l'ID de la chambre Choisies : ", id);
        
        return this.service.remove(id).pipe(takeUntil(this.destroy$));
    }

}