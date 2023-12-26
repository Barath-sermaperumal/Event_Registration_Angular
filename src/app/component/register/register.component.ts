import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouteReuseStrategy, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppUser } from 'src/app/model/appUser';
import { Login } from 'src/app/model/login';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  name: String = '';
  username: String = '';
  email: String = '';
  password: String = '';
  confirmPassword: String = '';

  user: AppUser = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  };

  register(form: NgForm) {
    let newUser: AppUser = form.value;
    this.authService.registerUser(newUser).subscribe({
      next: (Response: any) => {
        this.user=Response.data;
        this.router.navigate(['/login']);
      },
      complete: () => {},
      error: (error) => {
        this.error=error.error.error.message;
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
