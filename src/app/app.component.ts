import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  isLoginRegister: boolean = false;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService
  ) {
    let a:URL = new URL(window.location.href);
    if(a.pathname==="/login" || a.pathname === "/register"){
      this.authService.isAdmin$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
  
      this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  
      this.authService.isLoginRegister$.subscribe((isLoginRegister)=>{
        this.isLoginRegister = isLoginRegister;
      });
    }

    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.isLoginRegister$.subscribe((isLoginRegister)=>{
      this.isLoginRegister = isLoginRegister;
    });
  }

  logout(): void {
    this.authService.isLoginRegister$.subscribe((isLoginRegister)=>{
      this.isLoginRegister = isLoginRegister;
    });
    this.authService.logout();
  }
}
