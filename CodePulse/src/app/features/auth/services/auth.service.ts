import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginRequest } from '../login/models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginResponse } from '../login/models/login-response.model';
import { environment } from 'src/environments/environment';
import { User } from '../login/models/login-user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   $user=new BehaviorSubject<User | undefined>(undefined);


  constructor(private http:HttpClient,private cookieservice:CookieService) { }
   
  // local method 1
   setUser(user:User):void
   {
      this.$user.next(user);
      localStorage.setItem('user-email',user.email);
      localStorage.setItem('user-roles',user.roles.join(','));
   }

      // local method 2
    User() : Observable<User | undefined>
    {
        return this.$user.asObservable();
    }


  login(request:loginRequest):Observable<loginResponse>
  {
return this.http.post<loginResponse>(`${environment.apiBaseUrl}/api/auth/login`,
{
  Email:request.Email,
  Password:request.Password});

  }

  logout():void
  {
      localStorage.clear();
      this.cookieservice.delete('Authorization','/');
      //setting user to undefined
      this.$user.next(undefined);
  }

  getUser():User | undefined
  {
     const email=localStorage.getItem('user-email');
     const roles=localStorage.getItem('user-roles');
     if(email && roles)
     {
       const user :User=
       {
          email:email,
          roles:roles.split(',')
       };
       return user
     }
     // if user empty
     return undefined;
  }
}
