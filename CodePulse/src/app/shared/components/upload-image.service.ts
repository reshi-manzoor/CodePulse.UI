import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddImageModal } from './models/add-image.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService  {

  constructor(private http:HttpClient)  { }
  
   getallimages():Observable<AddImageModal[]>
   {
      return  this.http.get<AddImageModal[]>(`${environment.apiBaseUrl}/api/Images`);
   }

  imageupload(file:File,FileName:string,Title:string) :Observable<AddImageModal>
  {
     const form= new FormData();
     form.append('file',file);
     form.append('filename',FileName);
     form.append('title',Title);    
       
       return this.http.post<AddImageModal>(`${environment.apiBaseUrl}/api/Images`,form);
  }
}
