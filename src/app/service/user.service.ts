import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  AddUser(data,Key){
    let users = [];
    if(localStorage.getItem(Key)){
      users = JSON.parse(localStorage.getItem(Key));
      users =[data,...users]
    }
    else{
      users =[data]
    }
    localStorage.setItem(Key,JSON.stringify(users))
  }
 loginUser(){
  localStorage.getItem('Users')
 }
 isLoggedIn(){
  return !!localStorage.getItem('token')
 } 
}
