import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConfig } from '../Url.config';
import { NettoyageChoisieInterface } from '../../models/NettoyageChoisieModel.model';
import { NettoyageChoisieCrud } from './NettoyageChoisie.crud.service';

@Injectable({providedIn: 'root'})

export class NettoyageChoisieHttp extends NettoyageChoisieCrud<NettoyageChoisieInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.NETTOYAGE_CHOISIT_URL);
    }
}