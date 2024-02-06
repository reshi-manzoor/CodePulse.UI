import { Component } from '@angular/core';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {
  private file ?:File;
   FileName:string='';
   Title:string='';

  onFileUploadChange(event:Event): void
  {
     const element=event.currentTarget as HTMLInputElement;

      this.file=element.files?.[0];
      if(this.file && this.Title && this.FileName)
      {
        // call image uploadd service here
      }
  }
}
