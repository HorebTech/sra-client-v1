import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { TacheChoisieHttp } from "./TacheChoisie.http.service";
import { CredentialTacheChoisie } from "../../models/TacheChoisieModel.model";

@Injectable({
    providedIn: 'root'
})
export class TacheChoisieController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: TacheChoisieHttp
    ){}

    Get(id: string) {
        return this.service.get(id).pipe(
            takeUntil(this.destroy$));
    }

    Gets() {
        return this.service.gets().pipe(
            takeUntil(this.destroy$));
    }

    Create(credentials: CredentialTacheChoisie) {
        return this.service.create(credentials).pipe(
            takeUntil(this.destroy$));
    }

    Delete(id: string) {
        return this.service.remove(id).pipe(
            takeUntil(this.destroy$));
    }

}