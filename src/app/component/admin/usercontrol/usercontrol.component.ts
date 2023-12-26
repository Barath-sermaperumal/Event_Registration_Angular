import { Component } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-usercontrol',
  templateUrl: './usercontrol.component.html',
})
export class UsercontrolComponent {
  constructor(private authService: AuthService) {
    this.getAllProfiles();
  }

  user: AppUser[] = [];
  getAllProfiles() {
    this.authService.getAllUsers().subscribe({
      next: (response: any) => {
        this.user = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  deleteUser(id:number){
    this.authService.deleteUser(id).subscribe({
      next: (response: any) => {
        this.user = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
