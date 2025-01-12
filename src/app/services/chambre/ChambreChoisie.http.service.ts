import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChambreChoisieCrud } from './ChambreChoisie.crud.service';
import { ChambreChoisieInterface } from '../../models/ChambreChoisieModel.model';
import { UrlConfig } from '../Url.config';

@Injectable({providedIn: 'root'})

export class ChambreChoisieHttp extends ChambreChoisieCrud<ChambreChoisieInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.CHAMBRE_CHOISIE_URL);
    }
}