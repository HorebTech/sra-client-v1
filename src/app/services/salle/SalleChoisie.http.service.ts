import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalleChoisieInterface } from '../../models/SalleChoisieModel.model';
import { UrlConfig } from '../Url.config';
import { SalleChoisieCrud } from './SalleChoisie.crud.service';

@Injectable({providedIn: 'root'})

export class SalleChoisieHttp extends SalleChoisieCrud<SalleChoisieInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.SALLE_CHOISIE_URL);
    }
}