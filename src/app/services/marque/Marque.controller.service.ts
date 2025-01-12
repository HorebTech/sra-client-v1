import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { MarqueHttp } from "./Marque.http.service";
import { MarqueInterface } from "../../models/Marque.model";

@Injectable({
    providedIn: 'root'
})
export class MarqueController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: MarqueHttp
    ){}

    Get(id: string) {
        return this.service.getMarque(id).pipe(takeUntil(this.destroy$));
    }

    Gets() {
        return this.service.getMarques().pipe(takeUntil(this.destroy$));
    }

    Create(credentials: MarqueInterface) {
        return this.service.create(credentials).pipe(takeUntil(this.destroy$));
    }

    Update(credentials: MarqueInterface) {
        return this.service.updateMarque(credentials.id as string, credentials).pipe(takeUntil(this.destroy$));
    }

    Delete(id: string) {
        return this.service.remove(id).pipe(takeUntil(this.destroy$));
    }
}