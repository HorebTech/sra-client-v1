import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarqueCrud } from './Marque.crud.service';
import { UrlConfig } from '../Url.config';
import { MarqueInterface } from '../../models/Marque.model';


@Injectable({providedIn: 'root'})

export class MarqueHttp extends MarqueCrud<MarqueInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.MARQUE_URL);
    }
}