import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjetInterface } from '../../models/Objet.model';
import { ObjetCrud } from './Objet.crud.service';
import { UrlConfig } from '../Url.config';

@Injectable({providedIn: 'root'})

export class ObjetHttp extends ObjetCrud<ObjetInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.OBJET_URL);
    }
}