import {
  Component,
  OnInit,
  ViewChild,HostListener, ElementRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  ItemMasterModel,
  POSItemGrid
} from 'src/app/model/ItemMasterModel';
import {
  Configrution
} from 'src/app/pages/Configuration/Configuration';
import {
  ItemMasterService
} from 'src/app/service/item-master.service';
import {
  ToastrService
} from 'ngx-toastr';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  __param
} from 'tslib';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  MatCheckboxChange
} from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MultiArrModel } from 'src/app/model/MultiArrModel';

@Component({
  selector: 'app-item-master-list',
  templateUrl: './item-master-list.component.html',
  styleUrls: ['./item-master-list.component.scss']
})
export class ItemMasterListComponent implements OnInit {

  model: ItemMasterModel;
  MultiArr: MultiArrModel[];
  
  dataList: any;
  dataSource: any = [];
  displayedColumns = ['ItemDescription','UOM','Tax', 'DOC', 'actions'];
  _dataListLength: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: ItemMasterService,
    public _config: Configrution,
    private toastr: ToastrService,
    private _dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private elementRef: ElementRef
    ) { }

  ngOnInit(): void {
    this.model = new ItemMasterModel();
    this.GetAllItem();
    this.MultiArr = [];
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  async GetAllItem() {
    let response: any = await this.service.GetAll();
    if(response.Boolval == true){
      let Resp = response.data;
      this.dataList = Resp;
      this.dataSource = new MatTableDataSource(Resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._dataListLength = Resp.length;
      this.dataSource.paginator.length = Resp.length;
    }else {
      this.toastr.error(response.returnerror, "Item Master")
   }
  }

  onedit(data: any): void {
    this.router.navigate(['/ItemMasterEdit', data.ItemDescription], { relativeTo: this.route });
  }
  onCreate(): void {
    this.router.navigate(['/ItemMasterEdit', '0'], { relativeTo: this.route });
  }

  async onExport(data: any) {
    
    let _Response = await this.service.GetExportbyID(data)
    this.MultiArr = [];
      if(_Response.Boolval == true){
        let obj = {
          data : JSON.parse(JSON.stringify(_Response.HDR.map(({ ItemDescription,UOM,TaxPercentage,OpenItem,DateOfCreation, Void }) => ({ ItemDescription,UOM,TaxPercentage,OpenItem,DateOfCreation, Void })))),
          sheet:  "sheet1"
        }
        let obj2 = {
          data : JSON.parse(JSON.stringify(_Response.DET.map(({ ItemDescription, RPOSCode, Rate, Void }) => ({ ItemDescription, RPOSCode, Rate, Void })))),
          sheet: "sheet2"
        }
        this.MultiArr.push(obj);
        this.MultiArr.push(obj2);

    // Now, export both arrays to the same Excel file with different sheet names
      this._config.exportMultiArrayToExcel(this.MultiArr, "Item Master Details");
    }
    }

  Void(item){
    item.OpsType = 'V';
    item.Void = 'Y';
    this.CRUD(item);
  }

  UnVoid(item){
    item.OpsType = 'V';
    item.Void = 'N';
    this.CRUD(item);
  }

  async CRUD(Mod: ItemMasterModel){
    let val: any = await this.service.CRUD(Mod);
    if (val != null) {
      if (val.Boolval == true && Mod.Void == 'Y') {
        this.toastr.success("Item Voided Successfully.", "Item Master")
      } else if (val.Boolval == true && Mod.Void == 'N') {
        this.toastr.success("Item UnVoided Successfully.", "Item Master")
      } else {
        this.toastr.error(val.returnerror, "Item Master")
      }
    }
  }

  onView(){
    this.router.navigate(['/ItemMasterReport'], { relativeTo: this.route });    
  }

}
