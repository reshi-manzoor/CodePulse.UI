import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/features/blogpost/models/blogpost.model';
import { BlogpostService } from 'src/app/features/blogpost/services/blogpost.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
   blogpost$?:Observable<BlogPost[]>
   constructor(private blogPostservice:BlogpostService)
   {                 
   }  
  
  ngOnInit(): void {
      this.blogpost$= this.blogPostservice.getallblogposts()
  }

}
