import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../category/models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../category/models/category.model';
import { environment } from 'src/environments/environment';
import { EditCategoryRequest } from '../category/models/edit-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addcategory(model:AddCategoryRequest) : Observable<void>
  {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories?addAuth=true`,model);
  }

  getAllCategories() : Observable<Category[]>
  {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
  }
  getCategoryById(id: string) : Observable<Category>
  {
   return  this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }
  editcategory(id:string,model:EditCategoryRequest):Observable<void>
  {
        return this.http.put<void>(`${environment.apiBaseUrl}/api/Categories/${id}?addAuth=true`,model);
  }
  deletecategory(id:String) : Observable<Category>
  {
      return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/${id}?addAuth=true`);
  }
}
