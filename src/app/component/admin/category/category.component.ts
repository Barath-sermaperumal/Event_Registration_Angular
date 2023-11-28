import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent {

  constructor(private categoryService:CategoryService,
    private dataService:DataService){
    this.category=this.getAllCategories();
  }

  category:Category[]=[];
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe({
      next:(response: any)=>{
        this.category=response.data;
      },
      complete:()=>{},
      error:(error:Error)=>{
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      }
    });
    console.log(this.category);
    
    return this.category;
  }

  singleCategory:Category={
    name:"dummy"
  }
  getCategoryEvent(id:number){
    console.log(id);
    this.categoryService.getACategory(id).subscribe({
      next:(response: any)=>{
        this.singleCategory=response.data;
      },
      complete:()=>{},
      error:(error:Error)=>{
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      }
    });
    console.log(this.singleCategory);
    return this.singleCategory;
  }

  name:string="";
  id:number=0;
  image:String="";
  events:Event[]=[];

  cat:Category={
    id:this.id,
    name:this.name,
    image:this.image,
    events:this.events,
  }

  addCategory(form:NgForm){
    let cat1:Category=form.value;

    const f=new FormData();
    f.append('id',cat1.id!.toString());
    f.append('image',this.file);
    f.append('name',cat1.name.toString());
    f.append('image',cat1.image!.toString());

    this.categoryService.addCategory(f).subscribe({
      next:(response: any)=>{
        this.cat=response.data;
      },
      complete:()=>{},
      error:(error:Error)=>{
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      }
    });
    this.getAllCategories();
    return this.cat;
  }

  openmodal(cat:Category){
    this.cat = cat;
    return this.cat;
  }

  showCategory(id:number){
    this.categoryService.showCategory(id).subscribe(
      {
      next:(Response:any)=>{
        this.cat=Response.data;
      },
      complete:()=>{},
      error(error:Error) {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      }
    });
    return this.cat;
  }

  deleteCategory(id:number){
    console.log("delete");
    this.categoryService.deleteCategory(id).subscribe(
      {
      next:(Response:any)=>{
      },
      complete:()=>{},
      error(error:Error) {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      }
    });
    this.getAllCategories();
  }

  sendDataToService() {
    this.dataService.dataArray = this.getAllCategories();
  }

  file='';
  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
    }
  }
}
