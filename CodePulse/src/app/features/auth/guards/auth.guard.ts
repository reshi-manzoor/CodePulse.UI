import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {

  const cookieservice=inject(CookieService);
  const authservice=inject(AuthService);
  const router=inject(Router);
  const user=authservice.getUser();

  // check for the jwt token
  let token=cookieservice.get('Authorization');

   if(token)
   {
           token=token.replace('Bearer ','');
           const decodedtoken:any = jwtDecode(token);

           // check if token has expired
           const expirationDate=decodedtoken.expired*1000;
           const currentTime=new Date().getTime();

            if(expirationDate < currentTime)
            {
                // logout
                authservice.logout();
                return router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url}})
            }
            else
            {
                if(user?.roles.includes('Writer'))
                {
                   return true;
                }
                else
                {
                    alert('Un Authorized!');
                    return false;
                }
            }
   }
    else
    {
       authservice.logout();

        return router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url}})
    }
  
};
