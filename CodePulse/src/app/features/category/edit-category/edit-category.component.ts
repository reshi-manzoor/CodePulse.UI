import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../../services/category.service';
import { EditCategoryRequest } from '../models/edit-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit,OnDestroy {
  
   id :string | null=null;
   paramsSubscription ?: Subscription;
   editcategoryrequestsubscription ?: Subscription;

   category?: Category;

      constructor(private route:ActivatedRoute,private categoryservice:CategoryService,
        private router:Router) {  
   }
  ngOnInit(): void {
          this.route.paramMap.subscribe(
            {
              next:(params) =>
              {     this.id=params.get('id'); 
                // i will call the servive method here
                if(this.id)
                {
              this.paramsSubscription=    this.categoryservice.getCategoryById(this.id)
                  .subscribe({
                     next:(response) =>
                      {
                        console.log(response);
                        this.category=response;
                      }
                  });
                }
            }
            });
  }

   onSubmitForm() : void
   {
     console.log(this.category);
        const editcategoryrequest : EditCategoryRequest =
        {
          name : this.category?.name ?? '',
          urlhandle : this.category?.urlHandle ?? ''
        };

        // pass this object to service to update
          if(this.id)
          {
            this.editcategoryrequestsubscription=this.categoryservice.editcategory(this.id,editcategoryrequest)
            .subscribe({
               next:(response) =>
               {
               this.router.navigateByUrl('/admin/categories');
               }
            })
          }
   }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editcategoryrequestsubscription?.unsubscribe();
  }

}
