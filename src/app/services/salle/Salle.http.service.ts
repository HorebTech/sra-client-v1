import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConfig } from '../Url.config';
import { SalleCrud } from './Salle.crud.service';
import { SalleInterface } from '../../models/Salle.model';


@Injectable({providedIn: 'root'})

export class SalleHttp extends SalleCrud<SalleInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.SALLE_URL);
    }
}