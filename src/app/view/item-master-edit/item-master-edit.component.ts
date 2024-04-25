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
  UomMasterEditComponent
} from '../UomMaster/uom-master-edit/uom-master-edit.component';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  PosMasterEditComponent
} from '../PosMaster/pos-master-edit/pos-master-edit.component';
import {
  MatCheckboxChange
} from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaxMasterEditComponent } from '../TaxMaster/tax-master-edit/tax-master-edit.component';

@Component({
  selector: 'app-item-master-edit',
  templateUrl: './item-master-edit.component.html',
  styleUrls: ['./item-master-edit.component.scss']
})
export class ItemMasterEditComponent implements OnInit {


  model: ItemMasterModel;
  POSItemGrid: POSItemGrid;
  ItemList: any = []
  _taxDetails: any = [];
  UnitofMeasure: any;
  currentDate: Date;
  _lable: string = 'Submit';
  IsUpdate: string = 'false';
  IsVoid: string = 'false';
  OpenItemBoolean: boolean = false;
  MaxDate: any;
  poslist: any;
  positemgrid: POSItemGrid;
  dataList: any;
  dataSource: any = [];
  displayedColumns = ['ItemDescription','UOM','Tax', 'DOC', 'actions'];
  _dataListLength: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  _beforeTax = true;
  _taxPer = [];
  Param: string;
  minDate: any;
  
  
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this._taxDetails.length == 0) {
      this.toastr.warning('The Tax Details shoul not empty.If empty Please click Feed Tax!', 'Error');
      return
    } else {
      this._beforeTax = false;
    }
  }

  constructor(
    private service: ItemMasterService,
    public _config: Configrution,
    private toastr: ToastrService,
    private _dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private elementRef: ElementRef
  ) {
    const currentDate = new Date;
    this.minDate = new Date();
    this.minDate.setFullYear(currentDate.getFullYear() - 5);
  }

  
  ngOnInit(): void {
    this.currentDate = new Date();
    this.MaxDate = JSON.parse(JSON.stringify(this._config.gGetDateyyyymmdd(this.currentDate)));
    this.createForm();
    this.Param = this.route.snapshot.paramMap.get('id');
    if(this.Param != null && this.Param != '0' ){
      this.onSelectItemDescription(this.Param,'ts');
    }
  }

  createForm() {
    this.model = new ItemMasterModel();
    this.model.POSItemGrid = [];
    this.IsUpdate = "false";
    this.IsVoid = "false";
    this._lable = "Submit";
    this.OpenItemBoolean = false;
    this.setDate();
    this.GetAllItem();
    this.GetUOMAll();
    this.GetPOSCode('');
  }

  setDate() {
    this.model.DateOfCreation = this.MaxDate;
  }

  async GetAllItem() {
    let response: any = await this.service.GetAll();
    if(response.Boolval == true){
      // this.ItemList = response.data.map((e: { ItemDescription: any; }) => e.ItemDescription);
      
      let Resp = response.data;
      this.dataList = Resp;
      
      let minDate = Resp.reduce((min, obj) => {
        const currentDate = new Date(obj.DateOfCreation);
        return min < currentDate ? min : currentDate;
      }, new Date(Resp[0].DateOfCreation));
      this.minDate = minDate.toISOString();

      this.dataSource = new MatTableDataSource(Resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._dataListLength = Resp.length;
      this.dataSource.paginator.length = Resp.length;
    }else {
      this.toastr.error(response.returnerror, "Item Master")
   }
  }
  async GetUOMAll() {
    let resp = await this.service.GetUOMAll();
    if(resp.Boolval == true){
      if (resp.data != null) {
        this.UnitofMeasure = resp.data;
        if(resp.data.length == 1){
          this.model.UOM = resp.data[0].UOMCode
        }
      }
    }else {
      this.toastr.error(resp.returnerror, "Item Master")
   }
  }
  async GetPOSCode(load: string | undefined) {
    let response: any = await this.service.GetPOSAll();
    if(response.Boolval == true){
      if (response.data != null) {
        this.poslist = response.data;
        this.GetPoslist();
        if (load == 'Load')
        this.LoadPosGrid(this.model.ItemDescription)
      }
    } else {
       this.toastr.error(response.returnerror, "Item Master")
    }
  }

  GetPoslist() {
    this.model.POSItemGrid = [];
    for (let i = 0; i < this.poslist.length; i++) {
      this.positemgrid = new POSItemGrid();
      this.positemgrid.IsActive = false;
      this.positemgrid.Rate = 0;
      this.positemgrid.Enable = true;
      this.positemgrid.RPOSCode = this.poslist[i].Description;
      // this.positemgrid.RPOSCode = this.poslist[i].PosCode + "-->" + this.poslist[i].Description ;
      this.model.POSItemGrid.push(this.positemgrid);
    }
  }

  onClickActive(event: MatCheckboxChange, row: any) {
    console.log(event);
    if (event.checked) {
      this.model.POSItemGrid[row].IsActive = true;
      this.model.POSItemGrid[row].Enable = false;
    } else {
      this.model.POSItemGrid[row].IsActive = false;
      this.model.POSItemGrid[row].Enable = true;
      this.model.POSItemGrid[row].Rate = 0;
      // this.model.POSItemGrid[row].TaxPercentage = null;
      // this.model.POSItemGrid[row].TaxEnable = false;
    }
  }

  DeleteRow(row: any){
      this.model.POSItemGrid[row].IsActive = false;
      this.model.POSItemGrid[row].Enable = true;
      this.model.POSItemGrid[row].Rate = 0;
      // this.model.POSItemGrid[row].TaxPercentage = null;
      // this.model.POSItemGrid[row].TaxEnable = false;
  }

  async onSelectItemDescription(event: any, Type: any) {
    let item: any;
    if (Type == 'html') {
      item = event.value;
    } else {
      item = event;
    }
    let response: any = await this.service.GetItem(item);
    if(response.Boolval == true){
      let Value = response.data[0];
      this.IsUpdate = 'true';
      this._lable = 'Update';
      this.model = Value;
      this._taxPer = response.data.map((e: { TaxPercentage: any; }) => e.TaxPercentage);
      if (this._taxPer.length != 0){
        if(this._taxDetails.length == 0){
          this._taxDetails = JSON.parse(JSON.stringify(this._taxPer));
          // this._taxDetails.push(this.model.TaxPercentage);
          // this._taxPer = JSON.parse(JSON.stringify(this._taxDetails));
          this._beforeTax = false;
        } 
      }
      this.model.POSItemGrid = [];
      this.LoadPosGrid(item);
      if (Value.Void != null) {
        this.IsVoid = Value.Void == 'N' ? 'false' : 'true';
      }
    }else {
      this.toastr.error(response.returnerror, "Item Master")
   }
  }


  async LoadPosGrid(item: any) {
    let response: any = await this.service.GetItemDet(item);
    if(response.Boolval == true){
      this.model.POSItemGrid.length = 0;
      if (this.model.POSItemGrid.length == 0) {
        for (let i = 0; i < this.poslist.length; i++) {
          this.positemgrid = new POSItemGrid();
          this.positemgrid.IsActive = false;
          this.positemgrid.Rate = 0;
          this.positemgrid.Enable = true;
          // this.positemgrid.RPOSCode = this.poslist[i].PosCode + "-->" + this.poslist[i].Description ;
          this.positemgrid.RPOSCode = this.poslist[i].Description;
          let arr = response.data;
          for (let j = 0; j < arr.length; j++) {
            if (this.poslist[i].Description == arr[j].RPOSCode) {
              this.positemgrid.IsActive = true;
              this.positemgrid.Rate = arr[j].Rate;
              this.positemgrid.Enable = false;
              // this.positemgrid.RPOSCode = this.poslist[i].PosCode + "-->" + this.poslist[i].Description ;
              this.positemgrid.RPOSCode = arr[j].RPOSCode;
              // if(arr[j].TaxPercentage != null){
              // this.positemgrid.TaxEnable = true;
              // this.positemgrid.TaxPercentage = arr[j].TaxPercentage;
              // }
            }
          }
          this.model.POSItemGrid.push(this.positemgrid);
        }
      }
    }else {
      this.toastr.error(response.returnerror, "Item Master")
   }
  }

  onblurItemDescription(e: any, field: string) {
    if (field == 'Tax') {
      if (!e.target.validity.valid) {
        this.model.TaxPercentage = 0;
      }
    } else if (field == 'Rate') {
      if (!e.target.validity.valid) {
        this.model.ItemRate = 0;
      }
    } else if (field == 'Desc') {
      if (!e.target.validity.valid) {
        this.model.ItemDescription = '';
        // this.onClear('no');
      } else {
        const isValueIncluded = this.ItemList.includes(e.target.value);
        if (isValueIncluded == false) {
          // this.onSelectItemDescription(e.target.value,'ts')
          this._lable = 'Submit';
          this.IsUpdate = 'false'
        }
      }
    }
  }

  onblurItemPOSRate(event: any, row: any) {
    if (!event.target.validity.valid) {
      this.model.POSItemGrid[row].Rate = 0;
    }
  }

  openAddEditUOMForm() {
    if (this.model.UOM == 'AddUOM') {
      const dialogRef = this._dialog.open(UomMasterEditComponent, {
        disableClose: true
      });
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.GetUOMAll();
            this.model.UOM = '';
          }
        },
      });
      // sessionStorage.setItem('FormMdata', header);
      // this.modalService.open(pop, {
      //   backdropClass: 'light-blue-backdrop',
      //   size: 'xl',
      //   backdrop: 'static',
      // });
    }
  }
  openAddEditPOSForm() {
    const dialogRef = this._dialog.open(PosMasterEditComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetPOSCode('Load');
        }
      },
    });
  }

  // openTaxForm(pop: any) {
  //   this.modalService.open(pop, {
  //     backdropClass: 'light-blue-backdrop',
  //     size: 'xl',
  //     backdrop: 'static',
  //   });
  // }
  
  openTaxForm() {
    const dialogRef = this._dialog.open(TaxMasterEditComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val != null) {
          let arr = this._taxDetails;
          if(arr.includes(val)){
            this.toastr.warning("Tax Percentage already exits.", "Tax Master");
          } else {
            this.toastr.success("Tax Added Successfully.","Tax Master")
            this._taxDetails.push(val);
            if(this._taxDetails.length != 0){
              this._beforeTax = false;
            }
          }
        }
      },
    });
  }
  OnCloseTax(){
    this.modalService.dismissAll();
    sessionStorage.clear();
  }

  onClickbutton(eve){
    // let separatetax = eve.target.outerText;
    let separatetax = eve;
    let arr = this._taxPer;
    let checkVal = arr.includes(separatetax)
    if(checkVal == true){
      this.toastr.warning("This Tax Percentage is already saved,So you cannot delete this record.")
    } else {
      const index = this._taxDetails.indexOf(separatetax);
      if (index !== -1) {
        this._taxDetails.splice(index, 1);
        if(this._taxDetails.length == 0){
          this._beforeTax = true;
        }
      }
    }
  }

  onAddTax(){
    let obj = this.model.TaxPercentage;
  }

  formvalidatation() {
    if (this.model.ItemDescription == null || this.model.ItemDescription == undefined || this.model.ItemDescription == "") {
      this.toastr.warning("Item Description should not empty.", "Item Master");
      return false;
    } else if (this.model.ItemDescription.trim() == "") {
      this.toastr.warning("Item Description should not empty spaces.", "Item Master");
      return false;
    } else if (this.model.ItemDescription.length < 3) {
      this.toastr.warning("Item Description should not less than 3 characters.", "Item Master");
      return false;
    } else if (this.model.UOM == null || this.model.UOM == undefined || this.model.UOM == "") {
      this.toastr.warning("UOM should not empty.", "Item Master");
      return false;
    } else if (this.model.TaxPercentage == null || this.model.TaxPercentage == undefined) {
      this.toastr.warning("Tax Percentage should not empty.", "Item Master");
      return false;
    } else if (this.model.OpenItem == null || this.model.OpenItem == undefined || this.model.OpenItem == "") {
      this.toastr.warning("Open Item should not empty.", "Item Master");
      return false;
    }
    // else if(this.model.ItemRate == null || this.model.ItemRate == undefined){
    //   this.toastr.warning("Item Rate should not empty.","Item Master");
    //   return false;
    // }
    else if (this.model.DateOfCreation == null || this.model.DateOfCreation == undefined) {
      this.toastr.warning("Date of Creation should not empty.", "Item Master");
      return false;
    }
    let poslen = this.model.POSItemGrid.length;
    if (poslen <= 0) {
      this.toastr.warning("POS Grid should not empty,Please Add POS.", "Item Master");
      return false;
    }
    let filterdata = this.model.POSItemGrid.filter(e => e.IsActive == true);
    if (filterdata.length == 0) {
      this.toastr.warning("Please Active any POS.", "Item Master");
      return false;
    }
    for (let i = 0; i < this.model.POSItemGrid.length; i++) {
      if (this.model.POSItemGrid[i].IsActive == true) {
        if (this.model.POSItemGrid[i].Rate == null || this.model.POSItemGrid[i].Rate == undefined || this.model.POSItemGrid[i].Rate == 0) {
          this.toastr.warning("Please enter Rate in POS Code ( "+(this.model.POSItemGrid[i].RPOSCode)+" ).", "Item Master");
          return false;
        }
        // if (this.model.POSItemGrid[i].TaxPercentage == null || this.model.POSItemGrid[i].TaxPercentage == undefined) {
        //   if(this._taxDetails.length == 0){
        //     this.toastr.warning("Please Click Feed Tax and Enter Tax Percentage(%).", "Item Master");
        //     return false;
        //   } else {
        //     this.toastr.warning("Please enter Tax Percentage(%) in POS Code ( "+(this.model.POSItemGrid[i].RPOSCode)+" ).", "Item Master");
        //     return false;
        //   }
        // }
      }
    }

    return true
  }

  async onSubmit() {
    if (this.formvalidatation() == true) {
      const control = this.PrepareModel();
      control.Void = 'N';
      control.createdBy = 'Ranjith';
      control.isUpdate = this.IsUpdate;
      control.isVoid = 'false';
      if (this.IsUpdate == 'true') {
        control.updatedBy = 'Ranjith';
        control.OpsType = 'U';
      } else {
        control.updatedBy = '';
        control.ItemId = '';
        control.voidedBy = '';
        control.OpsType = 'S';
      }
      let val = await this.service.CRUD(control);
      if (val != null) {
        if (val.Boolval == true) {
          this.toastr.success("Item Saved Successfully.", "Item Master")
          // this.onReload('yes');
          this.onBack()
        } else {
          this.toastr.error(val.returnerror, "Item Master")
        }
      }
    }
  }

  PrepareModel() {
    let Mod = new ItemMasterModel;
    Mod.ItemId = this.model.ItemId;
    Mod.ItemDescription = this.model.ItemDescription;
    Mod.UOM = this.model.UOM;
    Mod.TaxPercentage = this.model.TaxPercentage;
    Mod.ItemRate = this.model.ItemRate;
    Mod.OpenItem = this.model.OpenItem;
    Mod.DateOfCreation = this._config.gGetDateyyyymmdd(this.model.DateOfCreation);
    Mod.Void = this.model.Void;
    Mod.createdBy = this.model.createdBy;
    Mod.updatedBy = this.model.updatedBy;
    Mod.voidedBy = this.model.voidedBy;
    Mod.POSItemGrid = [];
    for (let i = 0; i < this.model.POSItemGrid.length; i++) {
      if (this.model.POSItemGrid[i].IsActive == true) {
        let obj = {
          RPOSCode: this.model.POSItemGrid[i].RPOSCode,
          // RPOSCode : this.model.POSItemGrid[i].RPOSCode.split("-->", 2)[1],
          Rate: this.model.POSItemGrid[i].Rate,
          ItemDescription: this.model.ItemDescription,
          // TaxPercentage: this.model.POSItemGrid[i].TaxPercentage,
          TaxPercentage: null,
          Void: 'N',
          createdBy: 'Ranjith',
          IsActive: this.model.POSItemGrid[i].IsActive,
          Enable: false,
          TaxEnable: false
        }
        Mod.POSItemGrid.push(obj);
      }
    }
    return Mod
  }

  async onVoid() {
    if (this.formvalidatation() == true) {
      const editedMod = new ItemMasterModel();
      editedMod.Void = this.model.Void == 'N' ? 'Y' : 'N';
      editedMod.voidedBy = 'Ranjith';
      editedMod.ItemId = this.model.ItemId;
      editedMod.ItemDescription = this.model.ItemDescription;
      editedMod.OpsType = 'V';
      let val: any = await this.service.CRUD(editedMod);
      if (val != null) {
        if (val.Boolval == true && this.IsVoid == 'false') {
          this.toastr.success("Item Voided Successfully.", "Item Master")
          // this.onReload('yes');
          this.onBack()
        } else if (val.Boolval == true && this.IsVoid == 'true') {
          this.toastr.success("Item UnVoided Successfully.", "Item Master")
          // this.onReload('yes');
          this.onBack();
        } else {
          this.toastr.error(val.returnerror, "Item Master")
        }
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onedit(item: any){
    this.onSelectItemDescription(item.ItemDescription,'ts');
  }

  Void(item: any){}
  UnVoid(item: any){}

  onClear(clr: any) {
    this.model = new ItemMasterModel();
    if(clr == 'yes'){
      this.createForm();
      this.onReload(clr);
    }
  }

  onReload(Type: any) {
    if (Type == 'yes') {
      this.router.navigate(['/ItemMasterEdit', '0'], { relativeTo: this.route });
    }
  }

  onBack(){
    this.router.navigate(['/ItemMasterList'], { relativeTo: this.route });
  }
}
