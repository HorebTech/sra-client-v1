import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserController } from '../services/user/User.controller.service';
import { AuthResponse, TokenPayload } from '../models/User.model';

export const AuthGuard: CanActivateFn = (route, state) => {
  const connexionService = inject(UserController);
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService)
  
  let tokenDecoded = connexionService.tokenDecoded.getValue();

  if(!tokenDecoded){
    const tokensString = localStorage.getItem("userdata");
    if(tokensString) {
      const token = JSON.parse(tokensString) as AuthResponse;
      const tokenDecode = jwtHelper.decodeToken(token.accessToken as string) as TokenPayload;
      connexionService.tokenDecoded.next(tokenDecode);
      tokenDecoded = tokenDecode;
    }
  }
  
  if(tokenDecoded){
    if( route.data['requiredAuth'] == false){
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  } else {
    if(route.data['requiredAuth'] == true){
      router.navigate(['/']);
      return false;
    }
    return true;
  }

};

