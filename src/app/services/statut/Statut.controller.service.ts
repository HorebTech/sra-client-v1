import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { StatutHttp } from "./Statut.http.service";
import { StatutInterface } from "../../models/Statut.model";

@Injectable({
    providedIn: 'root'
})
export class StatutController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: StatutHttp
    ){}

    Get(id: string) {
        return this.service.getCategory(id).pipe(takeUntil(this.destroy$));
    }

    Gets() {
        return this.service.getStatuts().pipe(takeUntil(this.destroy$));
    }

    Create(credentials: StatutInterface) {
        return this.service.create(credentials).pipe(takeUntil(this.destroy$));
    }

    Update(credentials: StatutInterface) {
        return this.service.updateCategory(credentials.id as string, credentials).pipe(takeUntil(this.destroy$));
    }

    Delete(id: string) {
        return this.service.remove(id).pipe(takeUntil(this.destroy$));
    }
}