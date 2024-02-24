import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../models/blogpost.model';
import { UpdateBlogpostRequest } from '../models/update-blogpost-request.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http:HttpClient) {  }

   addblogpost(model:AddBlogpostRequest) : Observable<void>
   {
     return  this.http.post<void>(`${environment.apiBaseUrl}/api/BlogPosts?addAuth=true`,model);
   }

   getallblogposts() : Observable<BlogPost[]>
   {
     return   this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPosts`);
   }
   getblogpostbyid(id:string) :Observable<BlogPost>
   {
     return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}`);
   }

   getblogpostbyurlHandle(urlHandle:string) :Observable<BlogPost>
   {
     return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${urlHandle}`);
   }

   updateblogpost(id:string,updateblogpost:UpdateBlogpostRequest) : Observable<BlogPost>
   {
      return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}?addAuth=true`,updateblogpost);
   }
   deleteblogpost(id:string):Observable<BlogPost>
   {
      return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}?addAuth=true`);
   }
}
