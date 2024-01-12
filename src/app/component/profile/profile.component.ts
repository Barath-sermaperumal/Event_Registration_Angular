import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  id: number = 0;
  name: String = '';
  username: String = '';
  gender: String = '';
  email: String = '';
  phone: number = 0;
  address: String = '';
  image: String = '';

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe({
      next: (Response: any) => {
        this.user = Response.data;
      },
      complete: () => {},
      error(error: Error) {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

    this.authService.getDp().subscribe({
      next: (Response: any) => {
        this.dp = Response.data.image;
      },
      complete: () => {},
      error(error: Error) {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  dp: String = '';
  user: AppUser = <AppUser>{};

  updateProfile(profileForm: NgForm) {
    let formvalue: AppUser = profileForm.value;
    this.authService.updateUser(formvalue).subscribe({
      next: (Response: any) => {
        this.user = Response.data;
      },
      complete: () => {},
      error(error: Error) {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
    return this.user;
  }
}
