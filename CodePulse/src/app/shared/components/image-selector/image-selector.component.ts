import { AddImageModal } from './../models/add-image.model';
import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../upload-image.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {
  private file ?:File;
   FileName:string='';
   Title:string='';

    images$?: Observable<AddImageModal[]>;
      
      constructor(private imageservice:UploadImageService) { }


  ngOnInit(): void {
     this.getimages();
  }

  onFileUploadChange(event:Event): void
  {
     const element=event.currentTarget as HTMLInputElement;

      this.file=element.files?.[0];
      
  }
  onSubmitForm():void
  {
    if(this.file && this.Title && this.FileName)
    {
      // call image uploadd service here
          this.imageservice.imageupload(this.file,this.FileName,this.Title)
          .subscribe({
            next:(response)=>
            {
              console.log(response);
            }
          });

    }
  }
  private getimages()
  {
      this.images$ = this.imageservice.getallimages();
  }

   selectImage(image:AddImageModal) :void
  {
      this.imageservice.selectImage(image);
  }
}
