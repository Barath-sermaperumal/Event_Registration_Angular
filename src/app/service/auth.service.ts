import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANT, urlEndpoint } from '../utils/constant';
import { Login } from '../model/login';
import { BehaviorSubject, Observable, Observer, map } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { StorageService } from './storage.service';
import { AppUser } from '../model/appUser';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private isStaffSubject = new BehaviorSubject<boolean>(false);
  private isLoginRegisterSubject = new BehaviorSubject<boolean>(false);

  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  isLoginRegister$: Observable<boolean> =
    this.isLoginRegisterSubject.asObservable();
  isStaff$: Observable<boolean> = this.isStaffSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {
    if (storageService.getLoggedInUser().id != null) {
      this.setLoggedIn(storageService.getLoggedInUser());
    }
  }

  login(login: Login): Observable<AppResponse> {
    return this.http
      .post<AppResponse>(`http://localhost:8080/api/auth/login`, login)
      .pipe(
        map((user) => {
          this.storageService.setAuthData(
            window.btoa(login.username + ':' + login.password)
          );
          return user;
        })
      );
  }

  logout() {
    this.storageService.removeAuthData();
    this.isAdminSubject.next(false);
    this.isLoggedInSubject.next(false);
    this.isStaffSubject.next(false);
    this.storageService.removeLoggedInUser();
    this.storageService.removeRoute();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  isLoginRegister(): boolean {
    return this.isLoginRegisterSubject.value;
  }

  setLoggedIn(user: AppUser): void {
    this.storageService.setLoggedInUser(user);
    this.isLoggedInSubject.next(true);

    let route: string | null = this.storageService.getRoute();
    if (user.role === CONSTANT.USER) {
      if (route === null) route = '';
      this.router.navigate(['/' + route], { replaceUrl: true });
    } else if (user.role === CONSTANT.ADMIN) {
      if (route === null) route = 'admin';
      this.isAdminSubject.next(true);
      this.router.navigate(['/' + route], { replaceUrl: true });
    }
  }

  // customized
  getUser(): Observable<AppResponse> {
    const id: Number = this.storageService.getLoggedInUser().id!;
    return this.http.get<AppResponse>(
      `http://localhost:8080/EventRegistration/API/User/profile/${id}`
    );
  }

  getAllUsers(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `http://localhost:8080/EventRegistration/API/Admin/UserControl`
    );
  }

  updateUser(profileForm: AppUser): Observable<AppResponse> {
    console.log(profileForm);
    return this.http.put<AppResponse>(
      'http://localhost:8080/EventRegistration/API/User/profile',
      profileForm
    );
  }

  registerUser(user: AppUser): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      'http://localhost:8080/api/auth/register',
      user
    );
  }

  getDp(): Observable<AppResponse> {
    const id: Number = this.storageService.getLoggedInUser().id!;
    return this.http.get<AppResponse>(
      `http://localhost:8080/EventRegistration/API/User/profile/DP/${id}`
    );
  }

  deleteUser(id:number){
    return this.http.delete<AppResponse>(
      `http://localhost:8080/EventRegistration/API/Admin/UserControl/deleteUser/${id}`
    );
  }
}
