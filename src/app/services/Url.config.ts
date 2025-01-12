import { environment } from "../environments/environment";

export class UrlConfig {
    static readonly USER_URL = `${environment.APIBaseUrl}/`;
    static readonly CHAMBRE_URL = `${environment.APIBaseUrl}/chambre/`;
    static readonly CHAMBRE_CHOISIE_URL = `${environment.APIBaseUrl}/chambre-choisie/`;
    static readonly CATEGORIE_URL = `${environment.APIBaseUrl}/categorie/`;
    static readonly MARQUE_URL = `${environment.APIBaseUrl}/marque/`;
    static readonly STATUT_URL = `${environment.APIBaseUrl}/statut/`;

    static readonly TACHE_URL = `${environment.APIBaseUrl}/tache/`;
    static readonly TACHE_CHOISIE_URL = `${environment.APIBaseUrl}/tache-choisie/`;

    static readonly NETTOYAGE_URL = `${environment.APIBaseUrl}/nettoyage/`;
    static readonly NETTOYAGE_CHOISIT_URL = `${environment.APIBaseUrl}/nettoyage-choisie/`;

    static readonly SALLE_URL = `${environment.APIBaseUrl}/salle/`;
    static readonly SALLE_CHOISIE_URL = `${environment.APIBaseUrl}/salle-choisie/`;

    static readonly OBJET_URL = `${environment.APIBaseUrl}/objet/`;
    static readonly PANNE_URL = `${environment.APIBaseUrl}/panne/`;

    static readonly PASSE_URL = `${environment.APIBaseUrl}/passe/`;

}