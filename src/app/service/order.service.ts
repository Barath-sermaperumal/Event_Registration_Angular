import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getAllOrders():Observable<AppResponse>{
    return this.http.get<AppResponse>(
      'http://localhost:8080/EventRegistration/API/Admin/Order'
    );
  }
}
