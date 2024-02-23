import { Component } from '@angular/core';
import { loginRequest } from './models/login-request.model';
import { AuthService } from '../services/auth.service';
import {CookieService}  from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model:loginRequest;
 
  constructor(private authservice:AuthService,private cookieservice:CookieService,
    private route:Router) {
    
     this.model=
     {
      Email:'',
      Password:''
     }
  }
  submitForm() : void
  {
     // console.log(this.model);
       this.authservice.login(this.model)
       .subscribe({
        next : (response) =>
        {
               console.log(response)

       this.cookieservice.set('Authorization',`Bearer ${response.token}`,undefined,'/',undefined,true,'Strict');
       // navigate back to home page after login
            
       // set user
        this.authservice.setUser({
           email:response.email,
           roles:response.roles
        });
        
         this.route.navigateByUrl('/');
        }
   
       });
  }

}
