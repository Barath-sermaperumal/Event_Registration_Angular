import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { Filteredevents } from '../model/filteredevents';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}
  getAllEvents(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      'http://localhost:8080/EventRegistration/API/User/Event'
    );
  }
  getAllTopEvents(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      'http://localhost:8080/EventRegistration/API/User/Event/Top'
    );
  }
  getAEvents(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `http://localhost:8080/EventRegistration/API/User/Event/${id}`
    );
  }

  addProduct(event: FormData): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      'http://localhost:8080/EventRegistration/API/Admin/Event',
      event
    );
  }

  deleteEvent(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `http://localhost:8080/EventRegistration/API/Admin/Event/delete/${id}`
    );
  }

  getFilteredEvents(events: Filteredevents) {
    return this.http.post<AppResponse>(
      'http://localhost:8080/EventRegistration/API/User/Event/filteredEvents',
      events
    );
  }
}
