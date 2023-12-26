import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Login } from 'src/app/model/login';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  username: String = '';
  password: String = '';
  error: String = '';

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  isLoginRegister: boolean = false;

  constructor(private authService: AuthService, private eventService:EventService) {
    let a: URL = new URL(window.location.href);
    if (a.pathname === '/login' || a.pathname === '/register') {
      this.authService.isAdmin$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });

      this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });

      this.authService.isLoginRegister$.subscribe((isLoginRegister) => {
        this.isLoginRegister = isLoginRegister;
      });
    }
  }

  login(_loginForm: Form): void {
    let login: Login = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(login).subscribe({
      next: (response: AppResponse) => {
        let user: AppUser = response.data;
        this.authService.setLoggedIn(user);
      },
      error: (err) => {
        console.log(err);
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
      complete: () => console.log('There are no more action happen.'),
    });

    this.eventService.getAllEvents().subscribe({
      next: (response: any) => {
        localStorage.setItem("Events",JSON.stringify(response.data))
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
