import { Category } from "../../category/models/category.model";

export interface BlogPost
{     id:string;
     title:String;
     shortDescription: String;     
     content:String;
     urlHandle:String;
      publishedDate:Date;
      author:String;
      isvisible:boolean;
      featuredImageurl:String; 
      categories:Category[];        
        
}