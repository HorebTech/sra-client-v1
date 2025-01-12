import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PasseInterface } from '../../models/Passe.model';
import { UrlConfig } from '../Url.config';
import { PasseCrud } from './Passe.crud.service';

@Injectable({providedIn: 'root'})

export class PasseHttp extends PasseCrud<PasseInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.PASSE_URL);
    }
}