import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPost } from '../models/blogpost.model';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../services/category.service';
import { UploadImageService } from 'src/app/shared/components/upload-image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit,OnDestroy
{   
     model:AddBlogpostRequest; 
     categories$ ?: Observable<Category[]>;       
     isImageSelectorVisible : boolean = false;

     imageuploadersubscriotion ?: Subscription;

      constructor(
        private blogpostservice:BlogpostService,
        private route:Router ,
        private categoryservice:CategoryService,
        private imageservice:UploadImageService
        ) 
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

  ngOnInit(): void
   {
    this.categories$= this.categoryservice.getAllCategories();

   this.imageuploadersubscriotion=   this.imageservice.onSelectedImage()
      .subscribe({
        next: (selectedImage) =>
        {
            this.model.featuredimageurl=selectedImage.url;
            this.closeModal();
        }
      })
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
      
   ngOnDestroy(): void
    {
     this.imageuploadersubscriotion ?.unsubscribe();
  }
}
