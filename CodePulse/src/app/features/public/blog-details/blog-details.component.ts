import { BlogPost } from 'src/app/features/blogpost/models/blogpost.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../../blogpost/services/blogpost.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
 url:string | null = null;
 blogpost$ ? : Observable<BlogPost>;
    
    constructor(private route:ActivatedRoute,private blogpostservice:BlogpostService)
     {        
     }
  ngOnInit(): void {    
     this.route.paramMap
     .subscribe({
         next:(params) =>
         {
          this.url=params.get('url');
         }
     });
     if(this.url)
       this.blogpost$=this.blogpostservice.getblogpostbyurlHandle(this.url)
    }
        
}
