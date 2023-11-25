import { Component } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent {

  constructor(private categoryService:CategoryService){
    this.getAllCategories();
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
  }

  singleCategory:Category={
    name:"dummy"
  }
  getACategory(id:number){
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
    return this.singleCategory;
  }

}
