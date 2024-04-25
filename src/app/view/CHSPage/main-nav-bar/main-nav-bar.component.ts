import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.scss']
})
export class MainNavBarComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
  }

  openCHS(){
    this.router.navigate(['/ClubmanPage'], { relativeTo: this.route });
  }
  openLoginForm(){
    this.router.navigate(['/LoginPage'], { relativeTo: this.route });
  }
  openRegisterForm(){
    this.router.navigate(['/RegisterPage'], { relativeTo: this.route });
  }
}
