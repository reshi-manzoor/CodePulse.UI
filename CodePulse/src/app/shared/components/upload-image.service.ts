import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddImageModal } from './models/add-image.model';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService  {
 selectedImage:BehaviorSubject<AddImageModal>=new BehaviorSubject<AddImageModal>
 ({
     id:'',
     Title:'',
     url:'',
     FileExtension:'',
     FileName:''
 });


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

   selectImage(image:AddImageModal) : void
   {
      this.selectedImage.next(image);
   }

   onSelectedImage(): Observable<AddImageModal>
   {
     return this.selectedImage.asObservable();
   }
}
