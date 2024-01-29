import { Component } from '@angular/core';
import { BlogPost } from '../models/blogpost.model';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent 
{   
     model:AddBlogpostRequest;      
      constructor(private blogpostservice:BlogpostService,
        private route:Router ) 
        {
        this.model=
        {
           title:'',
           shortDescription:'',
           content:'',
           urlhandle:'',
           featuredimageurl:'',
           author:'',
           publisheddate: new Date(),
           isvisible:true
        }
      }
        onSubmitForm()
        {
            console.log(this.model);

             this.blogpostservice.addblogpost(this.model)
             .subscribe({              
               next:(response)=>
               {
                 this.route.navigateByUrl('/admin/blogposts');
               }
             })
        }       
      
}
