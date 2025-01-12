import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategorieCrud } from './Categorie.crud.service';
import { UrlConfig } from '../Url.config';
import { CategorieInterface } from '../../models/Categorie.model';


@Injectable({providedIn: 'root'})

export class CategorieHttp extends CategorieCrud<CategorieInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.CATEGORIE_URL);
    }
}