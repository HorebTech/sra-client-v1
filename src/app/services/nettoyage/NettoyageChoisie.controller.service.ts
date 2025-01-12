import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { NettoyageChoisieHttp } from "./NettoyageChoisie.http.service";
import { CredentialNettoyageChoisit } from "../../models/NettoyageChoisieModel.model";

@Injectable({
    providedIn: 'root'
})
export class NettoyageChoisieController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: NettoyageChoisieHttp
    ){}

    Get(id: string) {
        return this.service.get(id).pipe(
            takeUntil(this.destroy$));
    }

    Gets() {
        return this.service.gets().pipe(
            takeUntil(this.destroy$));
    }

    Create(credentials: CredentialNettoyageChoisit) {
        return this.service.create(credentials).pipe(
            takeUntil(this.destroy$));
    }

    Delete(id: string) {
        return this.service.remove(id).pipe(
            takeUntil(this.destroy$));
    }

}