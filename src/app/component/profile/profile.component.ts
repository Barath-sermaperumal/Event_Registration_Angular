import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent {

  id:number=0;
  name:String="";
  username: String="";
  gender:String="";
  email:String="";
  phone:number=0;
  address:String="";

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

  updateProfile(profileForm:NgForm){
    // let exuser:AppUser={
    //   id:this.id,
    //   name:this.name,
    //   username:this.username,
    //   email:this.email,
    //   phone:this.phone,
    //   gender:this.gender,
    //   address:this.address,
    // }
    let formvalue:AppUser=profileForm.value;
    this.authService.updateUser(formvalue).subscribe(
      {
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
