import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChambreCrud } from './Chambre.crud.service';
import { ChambreModel } from '../../models/Chambre.model';
import { UrlConfig } from '../Url.config';



@Injectable({providedIn: 'root'})

export class ChambreHttp extends ChambreCrud<ChambreModel, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.CHAMBRE_URL);
    }
}