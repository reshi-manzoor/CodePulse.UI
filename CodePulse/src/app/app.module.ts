import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { UpdateCategoryComponent } from './features/category/update-category/update-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { AddBlogpostComponent } from './features/blogpost/add-blogpost/add-blogpost.component';
import { BlogpostListComponent } from './features/blogpost/blogpost-list/blogpost-list.component';
import { EditBlogpostComponent } from './features/blogpost/edit-blogpost/edit-blogpost.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { HomeComponent } from './features/public/home/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    EditCategoryComponent,
    AddBlogpostComponent,
    BlogpostListComponent,
    EditBlogpostComponent,
    ImageSelectorComponent,
    HomeComponent,
    BlogDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
