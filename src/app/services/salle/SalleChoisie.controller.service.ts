import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { SalleChoisieHttp } from "./SalleChoisie.http.service";
import { ChambreChoisieCredentials } from "../../models/ChambreChoisieModel.model";
import { SalleChoisieCredentials } from "../../models/SalleChoisieModel.model";

@Injectable({
    providedIn: 'root'
})
export class SalleChoisieController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: SalleChoisieHttp
    ){}

    Get(id: string) {
        return this.service.get(id).pipe(
            takeUntil(this.destroy$));
        }

    Create(credential: SalleChoisieCredentials) {
        return this.service.create(credential).pipe(
            takeUntil(this.destroy$));
        }

    Gets() {return this.service.gets().pipe(
        takeUntil(this.destroy$));
    }

    Update(id: string, credential: SalleChoisieCredentials) {
        return this.service.updateChoosedHall(id, credential).pipe(
            takeUntil(this.destroy$));
        }

    Delete(id: string) {
        return this.service.remove(id).pipe(
            takeUntil(this.destroy$));
        }
}