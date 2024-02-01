import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogpostService } from '../services/blogpost.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../services/category.service';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { UpdateBlogpostRequest } from '../models/update-blogpost-request.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit ,OnDestroy {
  id:string | null=null;
  
  model ?: BlogPost;
  selectcategories ?: String[];
  categories$ ?: Observable<Category[]>;
  routersubscription ?: Subscription;
  blogpostsubscription ?: Subscription;
  getblockpostsubscription ?: Subscription;

  constructor(private activatedroute:ActivatedRoute,
    private blogpostservice:BlogpostService,
    private categoryservice:CategoryService,
    private route:Router
    )
     { }
 
  ngOnInit(): void {
    this.categories$=this.categoryservice.getAllCategories();
    this.routersubscription= this.activatedroute.paramMap.subscribe(
      {
        next:(params)=>
        {
         this.id=params.get('id');
         if (this.id)
         {
      this.getblockpostsubscription= this.blogpostservice.getblogpostbyid(this.id)
          .subscribe({
             next:(response) =>
             {
               this.model=response;
               this.selectcategories=response.categories.map(x => x.id);
             }
          })
         }
        
        }
      }
    );
  }
  onSubmitForm() :void
  {    
      if (this.model && this.id)
      {
        var  editcategoryrequest : UpdateBlogpostRequest=          
       {        
            title:this.model.title,
            author:this.model.author,
            shortDescription:this.model.shortDescription,
            content:this.model.content,
            publisheddate:this.model.publisheddate,
            urlhandle:this.model.urlhandle,
            featuredimageurl:this.model.featuredimageurl,
            isvisible:this.model.isvisible,
            categories:this.selectcategories ?? []
       };
       this.blogpostsubscription= this.blogpostservice.updateblogpost(this.id,editcategoryrequest)
          .subscribe({
              next:(response) =>
              {
                 console.log(response);
                   this.route.navigateByUrl('/admin/blogpost');
              }
            });
      }
      
  }
  ngOnDestroy(): void {
    this.routersubscription?.unsubscribe;
    this.blogpostsubscription ?.unsubscribe;
    this.getblockpostsubscription ?.unsubscribe;
  }
}
