import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}
  getAllEvents():Observable<AppResponse> {
    return this.http.get<AppResponse>(
      'http://localhost:8080/EventRegistration/API/User/Event'
    );
  }
  getAEvents(id:number):Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `http://localhost:8080/EventRegistration/API/User/Event/${id}`
    );
  }
  
}