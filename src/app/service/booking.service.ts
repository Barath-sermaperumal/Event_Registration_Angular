import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';
import { Seat } from '../model/seat';
import { Ticketseat } from '../model/ticketseat';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient,private storageService:StorageService) {}
  loggedInUserId: Number = this.storageService.getLoggedInUser().id!;

  getReport(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      'http://localhost:8080/EventRegistration/API/Admin/Report'
    );
  }

  bookTicket(bookedSeat: Ticketseat): Observable<AppResponse> {
    console.log(bookedSeat);

    return this.http.post<AppResponse>(
      'http://localhost:8080/EventRegistration/API/User/Order/Ticketbooking',
      bookedSeat
    );
  }

  sendEmail(): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/email/send-email`,
      this.loggedInUserId
    );
  }
}
