import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { TacheHttp } from "./Tache.http.service";
import { TacheCredentials, TacheInterface } from "../../models/Tache.model";

@Injectable({
    providedIn: 'root'
})
export class TacheController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: TacheHttp
    ){}

    Gets() {
        return this.service.getTaches().pipe(takeUntil(this.destroy$));
    }

    Get(id: string) {
        return this.service.getTache(id).pipe(takeUntil(this.destroy$));
    }

    Create(credentials: TacheCredentials) {
        return this.service.create(credentials).pipe(takeUntil(this.destroy$));
    }

    Update(credentials: TacheCredentials) {
        return this.service.updateTache(credentials).pipe(takeUntil(this.destroy$));
    }

    Delete(id: string) {
        return this.service.remove(id).pipe(takeUntil(this.destroy$));
    }
    
}