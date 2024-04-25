import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Configrution } from 'src/app/pages/Configuration/Configuration';
import { DataService } from 'src/app/pages/Configuration/DataService.service';

@Component({
  selector: 'app-employee-master-list',
  templateUrl: './employee-master-list.component.html',
  styleUrls: ['./employee-master-list.component.scss']
})
export class EmployeeMasterListComponent implements OnInit {

  receivedDataArray: any = [];
  dataList: any;
  dataSource: any = [];
  displayedColumns = ['Emp_Code','Emp_Type','Emp_Name', 'DOB','DOJ', 'actions'];
  _dataListLength: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService,
    public _config: Configrution,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit(): void {
    // this.dataService.dataArray.subscribe((dataArray) => {
    //   if(dataArray.length != 0){
    //     this.receivedDataArray.push(dataArray);
    //   }
    // });
    // this.receivedDataArray = this.dataService.getData();
    // if(this.receivedDataArray.length != 0){
      this.GetAllItem();
    // }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async GetAllItem() {
      let Resp = [];
      Resp = JSON.parse(localStorage.getItem('Employee'));
      this.dataList = Resp;
      this.dataSource = new MatTableDataSource(Resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._dataListLength = Resp.length;
      this.dataSource.paginator.length = Resp.length;
  }

  onAdd() {
    this.router.navigate(['/EmployeeMaster', '0'], { relativeTo: this.route });
  }
  
  onedit(data: any): void {
    this.router.navigate(['/EmployeeMaster', data.Emp_Code], { relativeTo: this.route });
  }
  onClear(){
    localStorage.clear();
    window.location.reload();
  }
}
