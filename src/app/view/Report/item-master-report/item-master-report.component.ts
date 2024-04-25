import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemDetailsEntity, ItemReportModel } from 'src/app/model/ItemReportModel';
import { Configrution } from 'src/app/pages/Configuration/Configuration';
import { ItemMasterService } from 'src/app/service/item-master.service';

@Component({
  selector: 'app-item-master-report',
  templateUrl: './item-master-report.component.html',
  styleUrls: ['./item-master-report.component.scss']
})
export class ItemMasterReportComponent implements OnInit {
  

  model : ItemReportModel;
  maxDate: any;
  _ItemDetails: any;
  ItemSelectAll: any;
  _formName: string = 'Item Master';
  Wise: any;
  minDate: any;

  constructor( public _config: Configrution,
    private toastr: ToastrService,
    private service: ItemMasterService,
    private route: ActivatedRoute,
    private router: Router,
    ){
      const currentDate = new Date;
      this.minDate = new Date();
      this.minDate.setFullYear(currentDate.getFullYear() - 5);
    }

  ngOnInit(): void {
    this.model = new ItemReportModel();
    this._ItemDetails = new ItemDetailsEntity();
    this.ItemSelectAll = false;
    this.setDate();
    this.getAll();
  }

  async getAll(){
    let resp = await this.service.GetAll();
    if (resp.Boolval == true){
      let Array = resp.data;
      Array = Array.map( (item) => { return {ItemDescription:item.ItemDescription,isChecked : false}});
      this._ItemDetails = Array;
      let minDate = resp.data.reduce((min, obj) => {
        const currentDate = new Date(obj.DateOfCreation);
        return min < currentDate ? min : currentDate;
      }, new Date(resp.data[0].DateOfCreation));
      this.minDate = minDate.toISOString();
    } else {
      this.toastr.error(resp.message,this._formName);
    }
  }

  setDate(){
    let currentDate = new Date();
    this.maxDate = JSON.parse(JSON.stringify(this._config.gGetDateyyyymmdd(currentDate)));
    this.model.FromDate = this.maxDate;
    this.model.ToDate = this.maxDate;
  }
  
  onChangeItem(){
    let arr = this._ItemDetails.filter(e => e.isChecked == true);
    if (arr.length != this._ItemDetails.length) {
      this.ItemSelectAll = false;
    } else {
      this.ItemSelectAll = true;
    }
  }

  selectAll(type){
    if (type == 'item'){
      for (let i=0; i< this._ItemDetails.length; i++){
        this._ItemDetails[i].isChecked = this.ItemSelectAll;
      }
    }
  }

  ValidateDate(){
    if (this.model.FromDate != null && this.model.FromDate != undefined && this.model.ToDate != null && this.model.ToDate != undefined) {
      let fdate = this._config.gGetDateyyyymmdd(this.model.FromDate);
      let tdate = this._config.gGetDateyyyymmdd(this.model.ToDate);
      if (fdate > tdate) {
        this.toastr.error("To Date should not be less than From Date", this._formName);
        this.model.ToDate = null;
        return;
      }
    }
  }

  formvalidatation(){
    if(this.Wise == null || this.Wise == undefined){
      this.toastr.warning("Please select Item Wise or Date Wise.","Item Report");
      return false;
    }
    if( this.Wise == 'Itemwise'){
      let length = this._ItemDetails.length;
      if(length == 0){
        this.toastr.warning("Please select Item Details.","Item Report");
        return false;
      }
    }
    return true
  }

  async onSubmit(){
    if(this.formvalidatation() == true){
      const _model = new ItemReportModel();
      _model.ItemDetails = this._ItemDetails;
      _model.FromDate = this._config.gGetDateyyyymmdd(this.model.FromDate);
      _model.ToDate = this._config.gGetDateyyyymmdd(this.model.ToDate);
      _model.OpsType = 'P';
      _model.createdBy = 'Ranjith'
      let resp = await this.service.CRUD(_model)
      let fdate = this._config.gGetDateyyyymmdd(this._config.gGetDate4Cal(formatDate(this.model.FromDate, "yyyy-MM-dd", this._config.localtimezone)));
      let tdate = this._config.gGetDateyyyymmdd(this._config.gGetDate4Cal(formatDate(this.model.ToDate, "yyyy-MM-dd", this._config.localtimezone)));
    // let url = this._config.ReportUrl + "ItemMaster/GetReportData?createdBy="+this.model.createdBy+"&FromDate="+this._config.gGetDateyyyymmdd(this.model.FromDate)+"&ToDate="+this._config.gGetDateyyyymmdd(this.model.ToDate);
      let url = this._config.ReportUrl + "ItemMaster/GetReportData?createdBy="+_model.createdBy+"&Type="+this.Wise+"&FromDate="+fdate+"&ToDate="+tdate;
      window.open(url, "_blank");
    }
  }
  
  onBack(){
    this.router.navigate(['/ItemMasterList'], { relativeTo: this.route });
  }
  
  onClear(){
    this.ngOnInit();
  }
  
  setToday(toggle, name) {
    if (name == 'to') {
      this.model.ToDate = this.maxDate;
      toggle.close();
    } else {
      this.model.FromDate = this.maxDate;
      toggle.close();
    }
    this.ValidateDate();
  }

}
