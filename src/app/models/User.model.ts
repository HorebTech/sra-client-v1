import { EntityState } from "@ngrx/entity";

export interface Utilisateur {
    id?: string; // UUID type in Java is represented as a string in TypeScript
    nom?: string;
    password?: string;
    newPassword?: string;
    email?: string;
    role?: string;
    photo?: string;
    connected?: boolean;
}

export interface TokenPayload {
    sub: string,
    authorities: [],
    iat: number,
    exp: number
  };

export interface AuthResponse {
    id?: string;
    statusCode?: number; // Correspond à int
    error?: string; // Peut être null s'il n'y a pas d'erreur
    message?: string;
    accessToken?: string;
    refreshToken?: string;
    expirationTime?: string; // Peut être une date au format ISO ou une chaîne
    email?: string;
    photo?: string | null; // Peut être null s'il n'y a pas de photo
    role?: string;
    nom?: string;
    connected?: boolean;
    utilisateur?: Utilisateur; // Remplacez "any" par une autre interface si vous avez la structure de "Utilisateur"
}

export interface UserRoleAccess {
    routerLink: string;
    icon: string;
    label: string
}

export interface UserModel extends EntityState<Utilisateur> {
    allUsers: Utilisateur[],
    userInfo: Utilisateur,
    menulist:UserRoleAccess[],
    isUserExisted: boolean
}
