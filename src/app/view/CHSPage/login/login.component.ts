import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../../model/LoginModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private toast:ToastrService,private router:Router) { }
  model:LoginModel;
  public showPassword: boolean = false;
  ngOnInit(): void {
    this.model = new LoginModel();
  }
   
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  formValidation(){
    if(this.model.Email == "" || this.model.Email == null || this.model.Email.trim() == ""){
      this.toast.warning('Email ID cannot be blank','')
      return false

    }
    if(this.model.Password ==  "" || this.model.Password == null || this.model.Password.trim() == ""){
      this.toast.warning('Password cannot be blank','')
    return false
    }
    return true
  }
  onSubmit() {
    if (this.formValidation() === true) {
      const loginuserData = localStorage.getItem('Users');
      
      if (loginuserData) {
        const users = JSON.parse(loginuserData);
        let validUser = false;
  
        for (const user of users) {
          if (user.Email === this.model.Email && user.Password === this.model.Password) {
           
            validUser = true;
            localStorage.setItem('UserName', user.Name); 
            break;
          }
        }
  
        if (validUser) {
          this.toast.success('Login Sucessfully.','')
          localStorage.setItem('token', '19a6609f-4ed9-4804-adad-a83ss670c7ba');
          this.router.navigate(['/ClubmanPage']);
        } else {
          this.toast.warning('Email ID or Password not correct', '');
          this.model = new LoginModel();
        }
      } else {
        this.toast.warning('No user data found', '');
      }
    }
  }
  
  ValidateEmail(event){
    if(!event.target.validity.valid){
      this.model.Email ="";
      this.toast.warning("Invalid Email Address.","")
   }
  }

}
