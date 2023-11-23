import { Component } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private authService:AuthService){
    this.user=this.getProfile();
  }

  user:AppUser={
    id: 0,
    name:"",
    username: "",
    gender:"",
    email:"",
    phone:0,
    password: "",
    address:"",
    role: "",
  }

  getProfile(){
    this.authService.getUser().subscribe({
      next:(Response:any)=>{
        this.user=Response.data;
      },
      complete:()=>{},
      error(error:Error) {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      }
    });
    return this.user;
  }

  updateProfile(user:AppUser){
    this.authService.updateUser(user).subscribe({
      next:(Response:any)=>{
        this.user=Response.data;
      },
      complete:()=>{},
      error(error:Error) {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      }
    });
    return this.user;
  }
}
