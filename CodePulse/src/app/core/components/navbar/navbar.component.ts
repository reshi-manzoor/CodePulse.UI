import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/login/models/login-user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   
   user ?:User;
   constructor(private authservice:AuthService,private router:Router)
   {
   }

   ngOnInit(): void {
     
      this.authservice.User()
      .subscribe({
         next :(response) =>
         {
            this.user=response;
         }
      })

      this.user=this.authservice.getUser();
   }
   onLogout():void
   {
      this.authservice.logout();
      this.router.navigateByUrl('/');
   }
}
