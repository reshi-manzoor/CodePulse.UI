import { Category } from "../../category/models/category.model";

export interface BlogPost
{     id:string;
     title:String;
     shortDescription: String;     
     content:String;
     urlhandle:String;
      publisheddate:Date;
      author:String;
      isvisible:boolean;
      featuredimageurl:String; 
      categories:Category[];        
        
}