import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  
  constructor( private router:Router) { }
  userName: string | null = null;
  ngOnInit(): void {
    this.userName = localStorage.getItem('UserName');

  }
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    this.router.navigate([''])
   
  }

}
