import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../models/blogpost.model';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit
{   
     model:AddBlogpostRequest; 
     categories$ ?: Observable<Category[]>;     
      constructor(private blogpostservice:BlogpostService,
        private route:Router ,private categoryservice:CategoryService) 
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
           isvisible:true,
           categories:[]
        }
      }
  ngOnInit(): void {
    this.categories$= this.categoryservice.getAllCategories();
  }
        onSubmitForm()
        {
           // console.log(this.model);

             this.blogpostservice.addblogpost(this.model)
             .subscribe({              
               next:(response)=>
               {
                 this.route.navigateByUrl('/admin/blogposts');
               }
             })
        }       
      
}
