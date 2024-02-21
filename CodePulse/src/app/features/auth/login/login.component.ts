import { Component } from '@angular/core';
import { loginRequest } from './models/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model:loginRequest;
 
  constructor() {
    
     this.model=
     {
      email:'',
      password:''
     }
  }
  submitForm() : void
  {
      console.log(this.model);
  }

}
