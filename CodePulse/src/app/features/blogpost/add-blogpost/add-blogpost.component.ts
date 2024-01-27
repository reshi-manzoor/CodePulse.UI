import { Component } from '@angular/core';
import { BlogPost } from '../models/blogpost.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent 
{    
     model:BlogPost;      
      constructor() {
        this.model=
        {
           title:'',
           shortdescription:'',
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
        }
        
      
}
