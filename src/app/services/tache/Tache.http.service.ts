import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TacheInterface } from '../../models/Tache.model';
import { UrlConfig } from '../Url.config';
import { TacheCrud } from './Tache.crud.service';


@Injectable({providedIn: 'root'})

export class TacheHttp extends TacheCrud<TacheInterface, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.TACHE_URL);
    }
}