import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';

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
  }

