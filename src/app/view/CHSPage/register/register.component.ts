import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../../model/RegisterModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  constructor( private toast:ToastrService,private router:Router,
    private service: UserService) { }
    
  model:RegisterModel;
  public showPassword: boolean = false;
  ngOnInit(): void {
    this.model = new RegisterModel();
    this.SetDate();
  }

  

  SetDate(){
    const today = new Date()
    this.minDate = new Date(
      today.getFullYear()-60,
      today.getMonth(),
      today.getDate()
    );
      this.maxDate = new Date(
        today.getFullYear()-18,
        today.getMonth(),
        today.getDate()
      );
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onblur(event,type){
    if (type == 'Name'){
      if(!event.target.validity.valid){
        this.model.Name ="";
        this.toast.warning("Please enter valid name.","")
     }
     if (this.model.Name.length > 40) {
       this.model.Name=""
       this.toast.warning('Maximum 40 character limit exceeded!', 'Warning');
     }
    }
    if (type == 'Phone'){
      if(!event.target.validity.valid){
        this.model.Phoneno ="";
        this.toast.warning("Please enter valid Contact No..","");
     }
    }
    if (type == 'Email'){
      if(!event.target.validity.valid){
        this.model.Email ="";
        this.toast.warning("Please enter valid Email ID.","");
     }
     const loginuser =  JSON.parse(localStorage.getItem('UsersEmail'));
     if (loginuser.length != 0){
      for (const item of loginuser)
      if(item === event.target.value){
       this.model.Email ="";
       this.toast.warning("Email ID Already Exists","");
      }
    }
    }
  }

  validatePassword(event){
    if(!event.target.validity.valid){
      this.toast.warning('Password Must be 6 characters 1 Special Characetr & 1 numeric value','')
      this.model.Password = ""
    }
  }

  validateConfrimPassword(event){
    if(this.model.Password !== event.target.value){
      this.toast.warning('Password and Confirm Password Should Match.','')
      this.model.ConfrimPassword = ""
    }
  }


  formValidation(){
    if(this.model.Name == "" || this.model.Name == null || this.model.Name.trim() == ""){
      this.toast.warning('Name cannot be blank','')
      return false
    }
    if(this.model.Email == "" || this.model.Email == null || this.model.Email.trim() == ""){
      this.toast.warning('Email ID cannot be blank','')
      return false
    }
    if(this.model.Phoneno == "" || this.model.Phoneno == null || this.model.Phoneno.trim() == ""){
      this.toast.warning('Contact No. cannot be blank','')
      return false
    }
    if(this.model.DOB == undefined || this.model.DOB == null){
      this.toast.warning('Date of Birth cannot be blank','')
      return false
    }
    if(this.model.Password ==  "" || this.model.Password == null || this.model.Password.trim() == ""){
      this.toast.warning('Password cannot be blank','')
     return false
    }
    if(this.model.ConfrimPassword == "" || this.model.ConfrimPassword == null || this.model.ConfrimPassword == undefined){
      this.toast.warning('Confrim Password Cannot Be Blank','')
      return false
    }
    return true
  }

  preparemodel(){
    const mod = new RegisterModel();
    mod.Name = this.model.Name,
    mod.Email = this.model.Email,
    mod.Phoneno = this.model.Phoneno,
    mod.DOB = this.model.DOB,
    mod.Password = this.model.Password,
    mod.ConfrimPassword = this.model.ConfrimPassword
    
    return mod
  }

  onSubmit(){
    if(this.formValidation() == true){
      const preparemodel = this.preparemodel();
      this.service.AddUser(preparemodel.Email,'UsersEmail')
      this.service.AddUser(preparemodel,'Users')
      this.router.navigate([''])
      this.toast.success('Register Sucessfully.','')
     
    }else{
      this.toast.warning('Try again.','')
    }
  }
}
