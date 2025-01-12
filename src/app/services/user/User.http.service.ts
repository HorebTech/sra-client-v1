import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../../models/User.model';
import { UrlConfig } from '../Url.config';
import { UserCrud } from './User.crud.service';

@Injectable({providedIn: 'root'})

export class UserHttp extends UserCrud<Utilisateur, string> {
    constructor(public override http: HttpClient) {
        super(http, UrlConfig.USER_URL);
    }
}