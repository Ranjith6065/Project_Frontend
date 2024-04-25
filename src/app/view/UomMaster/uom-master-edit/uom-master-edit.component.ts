import { Component, Inject,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UomMasterModel } from 'src/app/model/UOMMasterModel';
import { Configrution } from 'src/app/pages/Configuration/Configuration';
import { UomMasterService } from 'src/app/service/uom-master.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-uom-master-edit',
  templateUrl: './uom-master-edit.component.html',
  styleUrls: ['./uom-master-edit.component.scss']
})
export class UomMasterEditComponent implements OnInit {

  model: UomMasterModel;
  constructor(
    public _config: Configrution,
    private toastr: ToastrService,
    private service: UomMasterService,
    private _dialogRef: MatDialogRef<UomMasterEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,)
     {
      _dialogRef.disableClose = true; }

  ngOnInit(): void {
    this.model = new UomMasterModel();
  }
  
  formvalidatation(){
    if(this.model.UOMCode == null || this.model.UOMCode == undefined|| this.model.UOMCode == ""){
      this.toastr.warning("UOM Code should not empty.","UOM Master");
      return false;
    }
    else if(this.model.UOMCode.trim() == ""){
      this.toastr.warning("UOM Code should not empty spaces.","UOM Master");
      return false;
    }
    else if(this.model.UOMCode.length < 2){
      this.toastr.warning("UOM Code should not less than 2 characters.","UOM Master");
      return false;
    }
    else if(this.model.UOMDesc == null || this.model.UOMDesc == undefined|| this.model.UOMDesc == ""){
      this.toastr.warning("UOM Description should not empty.","UOM Master");
      return false;
    }
    else if(this.model.UOMDesc.trim() == ""){
      this.toastr.warning("UOM Description should not empty spaces.","UOM Master");
      return false;
    }
    else if(this.model.UOMDesc.length < 3){
      this.toastr.warning("UOM Description should not less than 3 characters.","UOM Master");
      return false;
    }
    return true
  }

  async onSubmit(){
    if(this.formvalidatation() == true){
      const control = this.PrepareModel();
      let val:any = await this.service.SaveUOM(control);
      if(val.Boolval == true){
          this.toastr.success("UOM Added Successfully.","UOM Master")
          this._dialogRef.close(true);
        }else {
          this.toastr.error(val.returnerror,"UOM Master")
        }

    }
  }

  PrepareModel(){
    const Mod = new UomMasterModel();
    Mod.UOMCode = this.model.UOMCode;
    Mod.UOMDesc = this.model.UOMDesc;
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
        this.model.UOMCode = '';
      }
    } else if(field == 'desc'){
      if (!e.target.validity.valid) {
        this.model.UOMDesc = '';
      }
    } 
  }
  
  onClear(){
    this.model = new UomMasterModel();
  }

}
