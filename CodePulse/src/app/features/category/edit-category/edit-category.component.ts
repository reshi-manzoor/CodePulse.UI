import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit,OnDestroy {
  
   id :string | null=null;
   paramsSubscription ?: Subscription;

   category?: Category;

      constructor(private route:ActivatedRoute,private categoryservice:CategoryService) {  
   }
  ngOnInit(): void {
          this.route.paramMap.subscribe(
            {
              next:(params) =>
              {     this.id=params.get('id'); 
                // i will call the servive method here
                if(this.id)
                {
                  this.categoryservice.getCategoryById(this.id)
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

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

}
