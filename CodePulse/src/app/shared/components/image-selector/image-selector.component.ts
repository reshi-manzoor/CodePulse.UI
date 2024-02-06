import { Component } from '@angular/core';
import { UploadImageService } from '../upload-image.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {
  private file ?:File;
   FileName:string='';
   Title:string='';
      
      constructor(private imageservice:UploadImageService) { }

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
}
