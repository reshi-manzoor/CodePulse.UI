import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {   
   model:AddCategoryRequest;
   constructor(private categoryservice:CategoryService,
    private router:Router)
   {
      this.model={
        name:'',
        urlHandle:''
      }
   }
  onSubmitForm()
  {
    this.categoryservice.addcategory(this.model)
    .subscribe({
       next: (response)=>
        {
           this.router.navigateByUrl('/admin/categories')
        },
        error:(err)=>
        {
          console.log(err);
        }
       
  })
  }
}
