import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NewAngularProject';

  fontawesomecssUrl: SafeUrl;
  brandscssUrl: SafeUrl;
  solidcssUrl: SafeUrl;
  
  constructor(private _dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public sanitizer: DomSanitizer)
    {}

    ngOnInit(){
      this.fontawesomecssUrl = this.sanitizer.bypassSecurityTrustResourceUrl("/assets/fontawesome-free-6.2.0-web/css/fontawesome.css");
      this.brandscssUrl = this.sanitizer.bypassSecurityTrustResourceUrl("/assets/fontawesome-free-6.2.0-web/css/brands.css");
      this.solidcssUrl = this.sanitizer.bypassSecurityTrustResourceUrl("/assets/fontawesome-free-6.2.0-web/css/solid.css");
    }

  openItemForm(){
    // this.router.navigate(['/ItemMaster'], { relativeTo: this.route });
    this.router.navigate(['/ItemMasterList'], { relativeTo: this.route });
  }
  openEmployeeForm(){
    this.router.navigate(['/EmployeeMaster','0'], { relativeTo: this.route });
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
