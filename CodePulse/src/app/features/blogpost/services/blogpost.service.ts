import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../models/blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http:HttpClient) {  }

   addblogpost(model:AddBlogpostRequest) : Observable<void>
   {
     return  this.http.post<void>(`${environment.apiBaseUrl}/api/BlogPosts`,model);
   }

   getallblogposts() : Observable<BlogPost[]>
   {
     return   this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPosts`);
   }
}
