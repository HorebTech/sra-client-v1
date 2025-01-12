import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NettoyageInterface } from '../../models/Nettoyage.model';
import { UrlConfig } from '../Url.config';
import { NettoyageCrud } from './Nettoyage.crud.service';


@Injectable({providedIn: 'root'})

export class NettoyageHttp extends NettoyageCrud<NettoyageInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.NETTOYAGE_URL);
    }
}