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
  isImageSelectorVisible : boolean = false;



  categories$ ?: Observable<Category[]>;
  routersubscription ?: Subscription;
  blogpostsubscription ?: Subscription;
  getblockpostsubscription ?: Subscription;

  
  constructor(private activatedroute:ActivatedRoute,
    private blogpostservice:BlogpostService,
    private categoryservice:CategoryService,
    private router:Router
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
             //  console.log(this.model);
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
      { // console.log(this.model ,"guid of the post",this.id);
        var  editcategoryrequest : UpdateBlogpostRequest=          
       {        
            title:this.model.title,
            author:this.model.author,
            shortDescription:this.model.shortDescription,
            content:this.model.content,
            publisheddate:this.model.publishedDate,
            urlhandle:this.model.urlHandle,
            featuredimageurl:this.model.featuredImageurl,
            isvisible:this.model.isvisible,
            categories:this.selectcategories ?? []
       };
       this.blogpostsubscription= this.blogpostservice.updateblogpost(this.id,editcategoryrequest)
          .subscribe({
              next:(response) =>
              {
                // console.log(response);
                   this.router.navigateByUrl('/admin/blogposts');
              }
            });
      }     
     
    }

    // delete blogpost here
    deleteRecord(): void
    {
          if(this.id)
          {
            this.blogpostservice.deleteblogpost(this.id)
            .subscribe({
              next:(response) =>
              {
                 this.router.navigateByUrl('/admin/blogposts')
              }
            });
          } 
      
      }
   // modal on function
   openImageSelector():void
   {
    // console.log(this.isImageSelectorVisible);
       this.isImageSelectorVisible =true;
     //  console.log(this.isImageSelectorVisible);
   }
   // close the modal
   closeModal() : void
   {
     this.isImageSelectorVisible=false;
   }
  ngOnDestroy(): void {
    this.routersubscription?.unsubscribe();
    this.blogpostsubscription ?.unsubscribe();
    this.getblockpostsubscription ?.unsubscribe();
  }
}
