import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../category/models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../category/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addcategory(model:AddCategoryRequest) : Observable<void>
  {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories`,model);
  }

  getAllCategories() : Observable<Category[]>
  {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
  }
}
