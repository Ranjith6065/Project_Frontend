import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { ItemMasterEditComponent } from './view/item-master-edit/item-master-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { UomMasterEditComponent } from './view/UomMaster/uom-master-edit/uom-master-edit.component';
import { PosMasterEditComponent } from './view/PosMaster/pos-master-edit/pos-master-edit.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaxMasterEditComponent } from './view/TaxMaster/tax-master-edit/tax-master-edit.component';
import { ItemMasterListComponent } from './view/item-master-edit/item-master-list/item-master-list.component';
import { ItemMasterReportComponent } from './view/Report/item-master-report/item-master-report.component';
import { EmployeeMasterEditComponent } from './view/EmployeeMaster/employee-master-edit/employee-master-edit.component';
import { EmployeeMasterListComponent } from './view/EmployeeMaster/EmployeeMasterList/employee-master-list/employee-master-list.component';
import { DataService } from './pages/Configuration/DataService.service';
import { SafePipe } from './model/Pipe';
import { ClubmanPageComponent } from './view/CHSPage/clubman-page/clubman-page.component';
import { LoginComponent } from './view/CHSPage/login/login.component';
import { RegisterComponent } from './view/CHSPage/register/register.component';
import { NavBarComponent } from './view/CHSPage/nav-bar/nav-bar.component';
import { MainNavBarComponent } from './view/CHSPage/main-nav-bar/main-nav-bar.component';
import { FooterComponent } from './view/CHSPage/footer/footer.component';
import { ProductsComponent } from './view/CHSPage/products/products.component';
import { TeamComponent } from './view/CHSPage/team/team.component';
import { ManagementComponent } from './view/CHSPage/management/management.component';
// import { DatePipe } from '@angular/common';

const routes: Routes = [
  {
    path: 'ItemMasterEdit/:id',
    component: ItemMasterEditComponent,
  },
  {
    path: 'ItemMasterList',
    component: ItemMasterListComponent,
  },
  {
    path: 'ItemMasterReport',
    component: ItemMasterReportComponent,
  },
  {
    path: 'EmployeeMaster/:id',
    component: EmployeeMasterEditComponent,
  },
  {
    path: 'EmployeeMasterList',
    component: EmployeeMasterListComponent,
  },
  {
    path: 'ClubmanPage',
    component: ClubmanPageComponent,
  },
  {
    path: 'LoginPage',
    component: LoginComponent,
  },
  {
    path: 'RegisterPage',
    component: RegisterComponent,
  },
  {
    path: 'MainNavBar',
    component: MainNavBarComponent,
  },
  {
    path: 'Team',
    component: TeamComponent,
  },{
    path: 'Management',
    component: ManagementComponent
  }
]

@NgModule({
  declarations: [
    SafePipe,
    AppComponent,
    ItemMasterEditComponent,
    UomMasterEditComponent,
    PosMasterEditComponent,
    TaxMasterEditComponent,
    ItemMasterListComponent,
    ItemMasterReportComponent,
    EmployeeMasterEditComponent,
    EmployeeMasterListComponent,
    ClubmanPageComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    MainNavBarComponent,
    FooterComponent,
    ProductsComponent,
    TeamComponent,
    ManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatDividerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    TypeaheadModule.forRoot(),
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgbModule,
    // DatePipe
  ],
  exports: [
    SafePipe,
  ],
  providers: [[{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],DataService,NgbActiveModal],
  bootstrap: [AppComponent,]
})
export class AppModule { }
