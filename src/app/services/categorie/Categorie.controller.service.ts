import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { CategorieHttp } from "./Categorie.http.service";
import { CategorieInterface } from "../../models/Categorie.model";

@Injectable({
    providedIn: 'root'
})
export class CategorieController {
    loading: boolean = true;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        protected service: CategorieHttp
    ){}

    Get(id: string) {
        return this.service.getCategory(id).pipe(takeUntil(this.destroy$));
    }

    Gets() {
        return this.service.getCategories().pipe(takeUntil(this.destroy$));
    }

    Create(credentials: CategorieInterface) {
        return this.service.create(credentials).pipe(takeUntil(this.destroy$));
    }

    Update(credentials: CategorieInterface) {
        return this.service.updateCategory(credentials.id as string, credentials).pipe(takeUntil(this.destroy$));
    }

    Delete(id: string) {
        return this.service.remove(id).pipe(takeUntil(this.destroy$));
    }
}