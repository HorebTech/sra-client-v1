import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PanneInterface } from '../../models/Panne.model';
import { PanneCrud } from './Panne.crud.service';
import { UrlConfig } from '../Url.config';

@Injectable({providedIn: 'root'})

export class PanneHttp extends PanneCrud<PanneInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.PANNE_URL);
    }
}