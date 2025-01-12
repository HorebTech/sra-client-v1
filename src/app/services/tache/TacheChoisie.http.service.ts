import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConfig } from '../Url.config';
import { TacheChoisieInterface } from '../../models/TacheChoisieModel.model';
import { TacheChoisieCrud } from './TacheChoisie.crud.service';

@Injectable({providedIn: 'root'})

export class TacheChoisieHttp extends TacheChoisieCrud<TacheChoisieInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.TACHE_CHOISIE_URL);
    }
}