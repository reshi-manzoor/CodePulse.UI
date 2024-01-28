import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { BlogPost } from '../models/blogpost.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
   
   blogposts$ ?: Observable<BlogPost[]>;
  constructor(private blogpostservice:BlogpostService) { }
  ngOnInit(): void {
    
        this.blogposts$ = this.blogpostservice.getallblogposts();
  }
}
