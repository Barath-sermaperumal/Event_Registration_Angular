import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {}
    getAllCategories():Observable<AppResponse>{
      return this.http.get<AppResponse>(
        'http://localhost:8080/EventRegistration/API/User/Category/all'
      );
    }

    getACategory(id:number):Observable<AppResponse>{
      return this.http.get<AppResponse>(
        `http://localhost:8080/EventRegistration/API/User/Category/${id}`
      );
    }

    addCategory(category:FormData):Observable<AppResponse>{
      return this.http.post<AppResponse>(
        'http://localhost:8080/EventRegistration/API/Admin/Category',category
      )
    }

    showCategory(id:number){
      return this.http.get<AppResponse>(
        `http://localhost:8080/EventRegistration/API/User/Category/show/${id}`
      )
    }

    deleteCategory(id:number){
      console.log("delete");
      return this.http.delete<AppResponse>(
        `http://localhost:8080/EventRegistration/API/Admin/Category/delete/${id}`
      )
    }
  }

