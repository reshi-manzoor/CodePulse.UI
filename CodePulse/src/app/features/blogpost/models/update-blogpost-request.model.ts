export interface UpdateBlogpostRequest
{
        title:String;
   shortDescription: String;   
    content:String;
    urlhandle:String;
     publisheddate:Date;
     author:String;
     isvisible:boolean;
     featuredimageurl:String;
     categories:String[];     
}