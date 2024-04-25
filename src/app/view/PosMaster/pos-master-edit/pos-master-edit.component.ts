import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Configrution } from 'src/app/pages/Configuration/Configuration';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { POSMasterModel } from 'src/app/model/PosMasterModel';
import { PosMasterService } from 'src/app/service/pos-master.service';

@Component({
  selector: 'app-pos-master-edit',
  templateUrl: './pos-master-edit.component.html',
  styleUrls: ['./pos-master-edit.component.scss']
})
export class PosMasterEditComponent implements OnInit {

  model: POSMasterModel;

  constructor(
    public _config: Configrution,
    private toastr: ToastrService,
    private service: PosMasterService,
    private _dialogRef: MatDialogRef<PosMasterEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,)
     {
      _dialogRef.disableClose = true; }

  ngOnInit(): void {
    this.model = new POSMasterModel();
  }
  
  formvalidatation(){
    if(this.model.PosCode == null || this.model.PosCode == undefined|| this.model.PosCode == ""){
      this.toastr.warning("POS Code should not empty.","POS Master");
      return false;
    }
    else if(this.model.PosCode.trim() == ""){
      this.toastr.warning("POS Code should not empty spaces.","POS Master");
      return false;
    }
    else if(this.model.PosCode.length < 2){
      this.toastr.warning("POS Code should not less than 2 characters.","POS Master");
      return false;
    }
    else if(this.model.Description == null || this.model.Description == undefined|| this.model.Description == ""){
      this.toastr.warning("POS Description should not empty.","POS Master");
      return false;
    }
    else if(this.model.Description.trim() == ""){
      this.toastr.warning("POS Description should not empty spaces.","POS Master");
      return false;
    }
    else if(this.model.Description.length < 3){
      this.toastr.warning("POS Description should not less than 3 characters.","POS Master");
      return false;
    }
    return true
  }
  
  async onSubmit(){
    if(this.formvalidatation() == true){
      const PrepMod = this.PrepareModel();
      let val:any = await this.service.SavePOS(PrepMod);
      if(val.Boolval == true){
          this.toastr.success("POS Added Successfully.","POS Master")
          this._dialogRef.close(true);
        }else {
          this.toastr.error(val.returnerror,"POS Master")
        }

    }
  }

  PrepareModel(){
    const Mod = new POSMasterModel();
    Mod.PosCode = this.model.PosCode;
    Mod.Description = this.model.Description;
    Mod.createdBy = 'Ranjith';
    Mod.Void = 'N';
    return Mod
  }

  onClosePopup(){
    this._dialogRef.close(true);
  }

  onblurUOM(e : any,field : string){
    if(field == 'code'){
      if (!e.target.validity.valid) {
        this.model.PosCode = '';
      }
    } else if(field == 'desc'){
      if (!e.target.validity.valid) {
        this.model.Description = '';
      }
    } 
  }
  
  onClear(){
    this.model = new POSMasterModel();
  }

}
