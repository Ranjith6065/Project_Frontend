import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemMasterEditComponent } from './view/item-master-edit/item-master-edit.component';
import { EmployeeMasterEditComponent } from './view/EmployeeMaster/employee-master-edit/employee-master-edit.component';
import { MainNavBarComponent } from './view/CHSPage/main-nav-bar/main-nav-bar.component';
import { ProductsComponent } from './view/CHSPage/products/products.component';
import { TeamComponent } from './view/CHSPage/team/team.component';
import { ManagementComponent } from './view/CHSPage/management/management.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ItemMaster',
        component: ItemMasterEditComponent,
      },
      {
        path: 'EmployeeMaster',
        component: EmployeeMasterEditComponent,
      },{

        path:'',
        component:MainNavBarComponent
      },{
        path: 'Products',
        component: ProductsComponent
      },
      {
        path: 'Team',
        component: TeamComponent,
      },{
        path: 'Management',
        component: ManagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
