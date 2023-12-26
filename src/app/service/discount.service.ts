import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  getAllDiscounts(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      'http://localhost:8080/discounts'
    );
  }
}
