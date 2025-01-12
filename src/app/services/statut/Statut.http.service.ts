import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatutCrud } from './Statut.crud.service';
import { UrlConfig } from '../Url.config';
import { StatutInterface } from '../../models/Statut.model';


@Injectable({providedIn: 'root'})

export class StatutHttp extends StatutCrud<StatutInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.STATUT_URL);
    }
}