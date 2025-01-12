import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import moment from 'moment';
import { MessageService } from 'primeng/api';

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort' && key !== 'type' &&
                req[key] !== null && req[key] !== undefined) {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach((val: any) => {
                options = options.append('sort', val);
            });
        }
    }
    return options;
};

export function toFormatFromDate(date: Date, pattern: string = 'DD/MM/YYYY'): string {
    return moment(date).locale('fr').format(pattern);
}

export function toFormatFromString(dateString: string, dateStringPattern: string, toPattern: string = 'DD/MM/YYYY'): string {
    const dateTmp = moment(dateString, dateStringPattern).toDate();
    return toFormatFromDate(dateTmp, toPattern);
}

export function patternToDate(dateString: string, pattern: string): Date {
    const date = moment(dateString, pattern).toDate();
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function unixToDate(unixStamp: number): Date {
    return moment(Number(unixStamp)).toDate();
}

export function sortArray(objectList: Array<any>, field: string, direction: 'asc' | 'desc', isNumber = false): Array<any> {
    let array: Array<any> = objectList.map(item => ({...item}));
    switch (direction) {
        case 'desc': {
            array = array.sort((a, b) => String(a[field]).localeCompare(String(b[field]), undefined,
                {numeric: isNumber}) > 0 ? -1 : 1);
            break;
        }
        case 'asc': {
            array = array.sort((a, b) => String(a[field]).localeCompare(String(b[field]), undefined,
                {numeric: isNumber}) < 0 ? -1 : 1);
            break;
        }
    }
    return array;
}

/**
 * Ordonner une liste selon plusieurs critères.
 *
 * @param dataList liste à ordonner.
 * @param fields liste des champs
 * @param direction le sens d'ordonnancement
 * @param isNumber true si les critères sont des nombres et false sinon
 *
 * @return la liste ordonnée
 */
export function sortWithMultipleCriteria(dataList: Array<any>, fields: Array<string>,
                                         direction: 'asc' | 'desc', isNumber: boolean): Array<any> {
    let sortedData: Array<any> = dataList;
    if (direction === 'desc') {
        fields.forEach((field: string, index: number) => {
            sortedData = sortedData.sort((a: any, b: any) => {
                if (index === 0) {
                    return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) > 0 ? -1 : 1;
                } else {
                    if (a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) === 0) {
                        return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) > 0 ? -1 : 1;
                    } else {
                        return a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) > 0 ? -1 : 1;
                    }
                }
            });
        });
    } else if (direction === 'asc') {
        fields.forEach((field, index) => {
            sortedData = sortedData.sort((a: any, b: any) => {
                if (index === 0) {
                    return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) < 0 ? -1 : 1;
                } else {
                    if (a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) === 0) {
                        return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) < 0 ? -1 : 1;
                    } else {
                        return a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) < 0 ? -1 : 1;
                    }
                }
            });
        });
    }

    return sortedData;
}

export function getTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export enum StatusEnum {
    error = 'error',
    success = 'success',
    warning = 'warn'
}

export class GloabalMessageConfig {

    private static errorMsg = 'Erreur de connection. Veuillez Contacter l\'administrateur';

    static setStatusMessage(status: number, localMessage: string, error?: HttpErrorResponse) {
        if (localMessage) {
            return localMessage;
        } else {
            switch (status) {
                case 200:
                    return 'Opération réussie';
                case 201:
                    return 'Opération réussie';
                case 204:
                    return 'Opération réussie';
                case 409:
                    return error?.error.message;
                case 400:
                    return error?.error.message;
                case 401:
                    return error?.error.message;
                case 403:
                    return error?.error.message;
                case 404: {
                    if (error?.error.message) {
                        return error.error.message;
                    } else {
                        return this.errorMsg;
                    }
                }
                case 500:
                    return this.errorMsg;
                default: {
                    return this.errorMsg;
                }
            }
        }
    }
}

export function buildMessage(severity: StatusEnum, status: number, localMessage: string, error?: HttpErrorResponse): any {
    const message = GloabalMessageConfig.setStatusMessage(status, localMessage, error);
    return {
        key: 'key',
        severity,
        summary: null,
        detail: message
    };
}

export function showToast(severity: StatusEnum, status: number, message: any,
                          messageService: MessageService, error?: HttpErrorResponse) {
    messageService.add(buildMessage(severity, status, message, error));
}


export function getTodayDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
}

export function convertirDate(dateString: any): any {
    const date = new Date(dateString);

  // Extraire les composants de la date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Construire la nouvelle chaîne de caractères dans le format désiré
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
  }