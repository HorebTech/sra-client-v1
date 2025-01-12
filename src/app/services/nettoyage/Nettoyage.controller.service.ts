import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { NettoyageHttp } from "./Nettoyage.http.service";
import { NettoyageCredentials, NettoyageInterface } from "../../models/Nettoyage.model";

@Injectable({
    providedIn: 'root'
})
export class NettoyageController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: NettoyageHttp
    ){}

    Gets() {
        return this.service.getNettoyages().pipe(takeUntil(this.destroy$));
    }

    Get(id: string) {
        return this.service.getNettoyage(id).pipe(takeUntil(this.destroy$));
    }

    Create(credentials: NettoyageCredentials) {
        return this.service.create(credentials).pipe(takeUntil(this.destroy$));
    }

    Update(credentials: NettoyageCredentials) {
        return this.service.updateNettoyage(credentials).pipe(takeUntil(this.destroy$));
    }

    Delete(id: string) {
        return this.service.remove(id).pipe(takeUntil(this.destroy$));
    }
    
}