import { Component, Inject,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Configrution } from 'src/app/pages/Configuration/Configuration';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tax-master-edit',
  templateUrl: './tax-master-edit.component.html',
  styleUrls: ['./tax-master-edit.component.scss']
})
export class TaxMasterEditComponent implements OnInit {
  TaxPercentage: number|null;

  constructor( public _config: Configrution,
    private toastr: ToastrService,
    private _dialogRef: MatDialogRef<TaxMasterEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,)
     {
      _dialogRef.disableClose = true; }

  ngOnInit(): void {
    this.TaxPercentage = null;
  }
  
  onblurItemDescription(event: any){
    if (!event.target.validity.valid) {
      this.TaxPercentage = null;
    }
  }

  formvalidatation(){
    if(this.TaxPercentage == null || this.TaxPercentage == undefined){
      this.toastr.warning("Tax Percentage should not empty.","Tax Master");
      return false;
    }
    return true
  }

  async onSubmit(){
    if(this.formvalidatation() == true){
      
      this._dialogRef.close(this.TaxPercentage);

    }
  }
  
  onClosePopup(){
    this._dialogRef.close(null);
  }
  
  onClear(){
    this.TaxPercentage = null
  }

}
