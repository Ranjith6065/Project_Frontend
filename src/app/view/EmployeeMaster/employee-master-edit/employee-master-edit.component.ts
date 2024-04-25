import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { EmployeeMasterModel } from 'src/app/model/EmployeeMaster';
import { Configrution } from 'src/app/pages/Configuration/Configuration';
import { DataService } from 'src/app/pages/Configuration/DataService.service';
import { NgbActiveModal, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-master-edit',
  templateUrl: './employee-master-edit.component.html',
  styleUrls: ['./employee-master-edit.component.scss']
})
export class EmployeeMasterEditComponent implements OnInit {

  _formname: string = 'Employee Master';
  model: EmployeeMasterModel;
  minDate: any;
  MaxDate: any;
  Marriage: boolean = false;
  JMin: any;
  JMax: any
  Emptype: null;
  EmpDestination: null;
  EmployeeTypeArray: any =[];
  EmployeeDestinationArray: any = [];
  PersonalDet: any =[];
  QualificationDet: any=[];
  Param: string;
  editedMod: EmployeeMasterModel;
  receivedDataArray: any = [];
  DocDetails: any= [];
  pdfUrl: SafeResourceUrl;
  defaultDynamicDoc: any = "assets/img/Document-converted.pdf"
  isUpdate: boolean;
  Imgname: any;
  Certificatename: any;
  EmpSpouseName: any;
  SpouseType: any;
  EmpSpouseTypeArray = [];
  SminDate: Date;
  WedminDate: Date;
  ChildDet = [];
  QualificationRowDet = [];
  // EmpTypeArray = [];
  DependentTypeArray = [];
  EDependentType: null;

  constructor(
    public _config: Configrution,
    private toastr: ToastrService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
    ) {
   }

  ngOnInit(): void {
    this.model = new EmployeeMasterModel();
    this.Marriage = false;
    this.isUpdate = false;
    this.setDate();  
    
    this.receivedDataArray = JSON.parse(localStorage.getItem('Employee'));
    this.EmployeeTypeArray = JSON.parse(localStorage.getItem('EmployeeType'));
    this.EmployeeDestinationArray = JSON.parse(localStorage.getItem('EmployeeDestination'));
    this.EmpSpouseTypeArray = JSON.parse(localStorage.getItem('SpouseType'));
    this.DependentTypeArray = JSON.parse(localStorage.getItem('DepenentType'));
    this.Param = this.route.snapshot.paramMap.get('id');
    if(this.Param != null && this.Param != '0' ){
      this.GetByid(this.Param);
    } else {
      this.QualificationDet.push({Class:null});
      let obj2 = {
        Class: null,
        NameofIns: null,
        YrPassing: null,
        Grade: null,
        Subjectoffered: null,
        QualifyCertificate: null
      }
      this.QualificationRowDet.push(obj2)
      this.DocDetails.push({Emp_Uploads: this.pdfUrl,name: null,type: 'image/jpeg',url: null},{Emp_Uploads: this.pdfUrl,name: null,type: 'application/pdf',url: null});
    }
  }

  GetCode(){
    let PreType = this.model.Emp_Type[0];
    const Code = PreType+'-001';
    this.receivedDataArray = this.receivedDataArray == null ? [] : this.receivedDataArray;
    if(this.receivedDataArray.length != 0){
      let codeArr = this.receivedDataArray.filter( item => item.Emp_Type == this.model.Emp_Type);
      if (codeArr.length != 0){
      const count = codeArr.length;
      this.model.Emp_Code = " "+PreType+"-"+(String(count + 1).padStart(3, '0'))+" "
      }
      else {
        this.model.Emp_Code = Code;
      }
    } 
    else {
      this.model.Emp_Code = Code;
    }
  }

  GetByid(id){
    let filterdata = this.receivedDataArray.filter( e=> e.Emp_Code == id);
    this.model = filterdata[0];
    let MrgStatus = filterdata[0].PersonalDet[0].Mar_Status;
    this.Marriage = MrgStatus == 'Y'? true: false;
    if (filterdata[0].PersonalDet[0].Emp_Dep != null){
      this.PersonalDet = filterdata[0].PersonalDet;
    }
    this.ChildDet = filterdata[0].DependentDet == null ? []:filterdata[0].DependentDet;
    this.QualificationRowDet = filterdata[0].QualificationRowDet == null ? []:filterdata[0].QualificationRowDet 
    this.QualificationDet = filterdata[0].QualificationDet;
    this.DocDetails = filterdata[0].DocDetails;
    this.isUpdate = true;
  }

  setDate(){
    const today = new Date();
    this.minDate = new Date(
      today.getFullYear() - 60,
      today.getMonth(),
      today.getDate()
    );
    this.SminDate = new Date(
      today.getFullYear() - 39,
      today.getMonth(),
      today.getDate()
    );
    this.MaxDate = new Date(
      today.getFullYear() - 20,
      today.getMonth(),
      today.getDate()
    );
    this.JMax = today;
    this.JMin = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
  }
  onAddRow(){
    if(this.model.Spouse == null || this.model.Spouse.trim() == ""){
      this.toastr.warning("Please enter Spouse.",this._formname);
      return
    }
    if(this.PersonalDet.length != 0){
      for (let row=0; row < this.PersonalDet.length; row++){
        if(this.PersonalDet[row].Emp_Dep == null || this.PersonalDet[row].Emp_Dep.trim() == ""){
          this.toastr.warning("Please enter Son / Daughter.",this._formname);
          return
        }
      }
    }
    let obj = {
      Mar_Status: this.Marriage == true ? 'Y':'N',
      Emp_Spouse: this.model.Spouse,
      Emp_Dep: null
    }
    this.PersonalDet.push(obj); 
    let obj2 = {
      Emp_Dep: null,
      DependentType: null,
      DateofBrith: null,
      Age: null,
      DependentPhoto: null,
      ContactNo: null,
      EmailId: null
    }
    this.ChildDet.push(obj2)
  }
  onAddDepRow(i){
    if (this.PersonalDet[i].Emp_Dep == null || this.PersonalDet[i].Emp_Dep.trim() == ""){
      this.toastr.warning("Please enter Son / Daughter.",this._formname);
          return
    } else {
      if (this.ChildDet.length == 0){
        let obj2 = {
          Emp_Dep: null,
          DependentType: null,
          DateofBrith: null,
          Age: null,
          DependentPhoto: null,
          ContactNo: null,
          EmailId: null
        }
        this.ChildDet.push(obj2);
        this.ChildDet[i].Emp_Dep = this.PersonalDet[i].Emp_Dep;
      } else {
        this.ChildDet[i].Emp_Dep = this.PersonalDet[i].Emp_Dep;
      }
    }
  }
  onAddQualiRow(i){
    if (this.QualificationDet[i].Class == null || this.QualificationDet[i].Class.trim() == ""){
      this.toastr.warning("Please enter Qualification.",this._formname);
          return
    } else {
      if(this.QualificationRowDet.length == 0){
      let obj2 = {
        Class: null,
        NameofIns: null,
        YrPassing: null,
        Grade: null,
        Subjectoffered: null,
        QualifyCertificate: null
      }
      this.QualificationRowDet.push(obj2);
      this.QualificationRowDet[i].Class = this.QualificationDet[i].Class;
      } else {
        this.QualificationRowDet[i].Class = this.QualificationDet[i].Class;
      }
    }
  }
  onAddSpouseDetailRow(EmpSpousePopUp){
    this.modalService.open(EmpSpousePopUp, {
      backdropClass: 'light-blue-backdrop',
      size: 'xl',
      backdrop: 'static',
    });
  }
  onAddSpouse(Spouse_Type){
    this.modalService.open(Spouse_Type, {
      backdropClass: 'light-blue-backdrop',
      size: 'xl',
      backdrop: 'static',
    });
  }
  onAddDependent(Dependentmodaltype){
    this.modalService.open(Dependentmodaltype, {
      backdropClass: 'light-blue-backdrop',
      size: 'xl',
      backdrop: 'static',
    });
  }
  onAddDepValue(i){
    this.ChildDet[i].Emp_Dep = this.PersonalDet[i].Emp_Dep;
  }
  onAddChildDetRow(EmpChildPopUp,row){
    const modalRef = this.modalService.open(EmpChildPopUp, {
      backdropClass: 'light-blue-backdrop',
      size: 'xl',
      backdrop: 'static',
      centered: true
    });
    // modalRef.componentInstance.i = row; 
    this.ChildDet.push({Emp_depentent: null})
  }
  onRemoveRow(row){
    this.PersonalDet.splice(row,1);
    this.ChildDet.splice(row,1)
  }
  onAddQualificationRow(row){
    if(this.QualificationDet[row].Class == null || this.QualificationDet[row].Class.trim() == ""){
      this.toastr.warning("Please enter Education Qualification "+(row+1)+".",this._formname);
      return
    }
    let obj = {
      Class: null
    }
    this.QualificationDet.push(obj); 
    let obj2 = {
      Class: null,
      NameofIns: null,
      YrPassing: null,
      Grade: null,
      Subjectoffered: null,
      QualifyCertificate: null
    }
    this.QualificationRowDet.push(obj2)
  }
  onAddQualifyDetRow(i){
    this.QualificationRowDet[i].Class = this.QualificationDet[i].Class;
  }
  
  onRemoveQualifyRow(row){
    this.QualificationDet.splice(row,1);
    this.QualificationRowDet.splice(row,1);
  }

  onSelectSDOB(){
    // let sdob = this.model.SDOB;
    this.WedminDate =  new Date(
      this.model.SDOB.getFullYear() + 18,
      this.model.SDOB.getMonth(),
      this.model.SDOB.getDate()
    );
  }
  
  onFileUpdate(event, index,Type) {
    const files = event.target.files;
    if (files.length === 0) return;

    const reader = new FileReader();
    if (files[0].size > 1024 * 1024) {
      this.toastr.warning('File size cannot exceed 1 MB.');
      return;
    }

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      if( index == 'image'){
        this.Imgname = files[0].name;
        if (Type == 'EmpImg'){
          this.model.Emp_Image = reader.result as string;
        }
        else if (Type == 'SpouseImg'){
          this.model.SImage = reader.result as string;
        }
      } else {
        this.Certificatename = files[0].name;
        this.model.Emp_MarriageCertificate = reader.result as string;
      } 

    };
  }
  
  displayDependentImage(event, index) {
    const files = event.target.files;
    if (files.length === 0) return;

    const reader = new FileReader();
    if (files[0].size > 1024 * 1024) {
      this.toastr.warning('File size cannot exceed 1 MB.');
      return;
    }

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.ChildDet[index].DependentPhoto = reader.result as string;
    };
  }
  
  onQualifyFileUpdate(event, index) {
    const files = event.target.files;
    if (files.length === 0) return;

    const reader = new FileReader();
    if (files[0].size > 1024 * 1024) {
      this.toastr.warning('File size cannot exceed 1 MB.');
      return;
    }
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      
      this.QualificationRowDet[index].QualifyCertificate = reader.result as string;

    };
  }

  onAddImage(){
    this.DocDetails.push({Emp_Uploads: null,name: null,type: 'image/jpeg',url: null});
  }

  onRemoveImg(row){
    if(this.DocDetails.length > 1){
      this.DocDetails.splice(row,1)
    }
  }
  onSaveDestination(){
    if( this.EmpDestination != null){
      // this.EmployeeDestinationArray.push(this.EmpDestination);
      if(localStorage.getItem('EmployeeDestination')){
        this.EmployeeDestinationArray = JSON.parse(localStorage.getItem('EmployeeDestination'));
        this.EmployeeDestinationArray = [this.EmpDestination,...this.EmployeeDestinationArray];
      } else {
        this.EmployeeDestinationArray = [this.EmpDestination];
      }
      localStorage.setItem('EmployeeDestination',JSON.stringify(this.EmployeeDestinationArray));
      this.toastr.success("Destination added Successfully",this._formname);
      this.EmpDestination = null;
    } else {
      this.toastr.warning("Add Destination cannot be blank",this._formname);
    }
  }
  
  onSaveEmployeeType(){
    if( this.Emptype != null){
      if(localStorage.getItem('EmployeeType')){
        this.EmployeeTypeArray = JSON.parse(localStorage.getItem('EmployeeType'));
        this.EmployeeTypeArray = [this.Emptype,...this.EmployeeTypeArray];
      } else {
        this.EmployeeTypeArray = [this.Emptype];
      }
      localStorage.setItem('EmployeeType',JSON.stringify(this.EmployeeTypeArray));
      this.toastr.success("Type added Successfully",this._formname);
      this.Emptype = null;
    } else {
      this.toastr.warning("Add Employee Type cannot be blank",this._formname);
    }
  }
  
  onAddSpouseType(){
    if( this.SpouseType != null){
      if(localStorage.getItem('SpouseType')){
        this.EmpSpouseTypeArray = JSON.parse(localStorage.getItem('SpouseType'));
        this.EmpSpouseTypeArray = [this.SpouseType,...this.EmpSpouseTypeArray];
      } else {
        this.EmpSpouseTypeArray = [this.SpouseType];
      }
      localStorage.setItem('SpouseType',JSON.stringify(this.EmpSpouseTypeArray));
    this.toastr.success("Spouse Type Added successfully.",this._formname);
    }
    this.modalService.dismissAll();
  }
  onAddSpouseRow(){
    this.toastr.success("Spouse Data Added successfully.",this._formname);
    this.modalService.dismissAll();
  }
  onCloseSType(){
    this.modalService.dismissAll();
  }  
  onAddDeptype(){
    if( this.EDependentType != null){
      if(localStorage.getItem('DepenentType')){
        this.DependentTypeArray = JSON.parse(localStorage.getItem('DepenentType'));
        this.DependentTypeArray = [this.EDependentType,...this.DependentTypeArray];
      } else {
        this.DependentTypeArray = [this.EDependentType];
      }
      localStorage.setItem('DepenentType',JSON.stringify(this.DependentTypeArray));
      this.toastr.success("Destination added Successfully",this._formname);
      this.EDependentType = null;
    } else {
      this.toastr.warning("Dependent Type cannot be blank",this._formname);
    }
  }

  formValidation(){
    if(this.model.Emp_Code == null || this.model.Emp_Code.trim() == ""){
      this.toastr.warning("Employee Code cannot be blank",this._formname)
      return false;
    }
    if(this.model.Emp_Type == null || this.model.Emp_Type == ""){
      this.toastr.warning("Employee Type cannot be blank",this._formname)
      return false;
    }
    if(this.model.Emp_Name == null || this.model.Emp_Name.trim() == ""){
      this.toastr.warning("Employee Name cannot be blank",this._formname)
      return false;
    }
    if(this.model.DOB == null || this.model.DOB == undefined){
      this.toastr.warning("Date Of Birth cannot be blank",this._formname)
      return false;
    }
    if(this.model.Emp_Designation == null || this.model.Emp_Designation.trim() == ""){
      this.toastr.warning("Employee Code cannot be blank",this._formname);
      return false;
    }
    if(this.model.DOJ == null || this.model.DOJ == undefined){
      this.toastr.warning("Date Of Birth cannot be blank",this._formname);
      return false;
    }
    if(this.Marriage == true){
      if(this.model.Spouse == null ||this.model.Spouse.trim() == "" ||this.model.Spouse == undefined){
        this.toastr.warning("Spouse Name should not empty.",this._formname);
        return false;
      }
      for (let i=0;i< this.PersonalDet.length;i++){
        if(this.PersonalDet[i].Emp_Dep == null || this.PersonalDet[i].Emp_Dep.trim() == ""){
          this.toastr.warning("Son / Daughter "+(i+1)+" cannot be blank (or) remove that row.",this._formname);
          return false;
        }
      }
    }
    let Qlen = this.QualificationDet.length;
    if (Qlen == 0){
      this.toastr.warning("Qualification Details should not empty.",this._formname);
      return false;
    }
    for (let i=0;i< Qlen;i++){
      if(this.QualificationDet[i].Class == null){
        this.toastr.warning("Qualification "+(i+1)+" cannot be blank (or) remove that row.",this._formname);
        return false;
      }
    }
    // let ImgLen = this.DocDetails.length;
    // if (ImgLen == 0){
    //   this.toastr.warning("Employee Uploads should not empty.",this._formname);
    //   return false;
    // }
    // for (let i=0;i< ImgLen;i++){
    //   if(this.DocDetails[i].Emp_Uploads == null){
    //     this.toastr.warning("Please Upload Image or Certificate",this._formname);
    //     return false;
    //   }
    // }
    if (this.model.Emp_Image == null || this.model.Emp_Image == undefined || this.model.Emp_Image == ""){
      this.toastr.warning("Please Upload Employee Image.",this._formname);
      return false;
    }
    if(this.Marriage == true){
      if (this.model.Emp_MarriageCertificate == null || this.model.Emp_MarriageCertificate == undefined || this.model.Emp_MarriageCertificate == ""){
        this.toastr.warning("Please Upload Employee Marrige Certificate.",this._formname);
        return false;
      }
    }
    return true;
  }

  onSubmit(){
    if(this.formValidation() == true){
      const editedMod = this.prepareModel();
      if (this.isUpdate == true){
        this.CRUD(editedMod.Emp_Code);
      }
      this.dataService.SetEmployeeDet(editedMod);
      this.toastr.success("Record saved sucessfully.");
      this.onBack()
    }    
  }

  CRUD(emp_code){
    const updatedArray = this.receivedDataArray.filter(item => item.Emp_Code != emp_code);
    localStorage.removeItem('Employee');
    for (let i=0; i< updatedArray.length; i++){
      this.dataService.SetEmployeeDet(updatedArray[i]);
    }
  }

  prepareModel(){
    const Mod = new EmployeeMasterModel();
    Mod.Emp_Code = this.model.Emp_Code;
    Mod.Emp_Type = this.model.Emp_Type;
    Mod.Emp_Name = this.model.Emp_Name;
    Mod.DOB = this._config.gGetDateyyyymmdd(this.model.DOB);
    Mod.Emp_Designation = this.model.Emp_Designation;
    Mod.DOJ = this._config.gGetDateyyyymmdd(this.model.DOJ);
    Mod.Emp_Image = this.model.Emp_Image;
    Mod.Emp_MarriageCertificate = this.model.Emp_MarriageCertificate;
    Mod.Spouse = this.model.Spouse;
    Mod.SpouseType = this.model.SpouseType;
    Mod.DOW = this._config.gGetDateyyyymmdd(this.model.DOW);
    Mod.SDOB = this._config.gGetDateyyyymmdd(this.model.SDOB);
    Mod.SCellNo = this.model.SCellNo;
    Mod.SEmailId = this.model.SEmailId;
    Mod.SImage = this.model.SImage;
    Mod.PersonalDet = [];
    let PerLen = this.PersonalDet.length;
    let MrgStatus = this.Marriage == true?'Y':'N';
    if (MrgStatus == 'Y'){
      if(PerLen == 0){
        let obj ={
          Mar_Status: MrgStatus,
          Emp_Spouse: this.model.Spouse,
          Emp_Dep: null
        }
        Mod.PersonalDet.push(obj);
      } else {
        for (let i=0; i< this.PersonalDet.length; i++){
          let obj ={
            Mar_Status: this.PersonalDet[i].Mar_Status,
            Emp_Spouse: this.PersonalDet[i].Emp_Spouse,
            Emp_Dep: this.PersonalDet[i].Emp_Dep,
          }
          Mod.PersonalDet.push(obj);
        }
  
      }
    } else {
      let obj ={
        Mar_Status: MrgStatus,
        Emp_Spouse: null,
        Emp_Dep: null
      }
      Mod.PersonalDet.push(obj);
      Mod.SCellNo = null;
      Mod.SDOB = null;
      Mod.SEmailId = null;
      Mod.SImage = null;
      Mod.SpouseType = null;
      Mod.Spouse = null;
      Mod.DOW = null;
    }
    Mod.DependentDet = [];
    if (this.PersonalDet.length > 0){
      if (this.PersonalDet[0].Emp_Dep != null && MrgStatus == 'Y'){
        for (let i=0; i< this.ChildDet.length; i++){
          let obj ={
            Emp_Dep: this.ChildDet[i].Emp_Dep,
            DependentType: this.ChildDet[i].DependentType,
            DateofBrith: this.ChildDet[i].DateofBrith,
            Age: this.ChildDet[i].Age,
            DependentPhoto: this.ChildDet[i].DependentPhoto,
            ContactNo: this.ChildDet[i].ContactNo,
            EmailId: this.ChildDet[i].EmailId,
          }
          Mod.DependentDet.push(obj);
        }
      }
    }
    Mod.QualificationDet = [];
    let QLen = this.QualificationDet.length;
    if(QLen != null){
      for (let i=0; i< this.QualificationDet.length; i++){
        let obj ={
          Class: this.QualificationDet[i].Class
        }
        Mod.QualificationDet.push(obj);
      }
    }
    Mod.QualificationRowDet = [];
    for (let i=0; i< this.QualificationRowDet.length; i++){
      let obj ={
        Class: this.QualificationRowDet[i].Class,
        NameofIns: this.QualificationRowDet[i].NameofIns,
        YrPassing: this.QualificationRowDet[i].YrPassing,
        Grade: this.QualificationRowDet[i].Grade,
        Subjectoffered: this.QualificationRowDet[i].Subjectoffered,
        QualifyCertificate: this.QualificationRowDet[i].QualifyCertificate
      }
      Mod.QualificationRowDet.push(obj);
    }

    Mod.DocDetails = [];
    // let ImgLen = this.DocDetails.length;
    // if(ImgLen != null){
    //   for (let i=0; i< this.DocDetails.length; i++){
    //     let obj ={
    //       Emp_Uploads: this.DocDetails[i].Emp_Uploads,
    //       type: this.DocDetails[i].type,
    //       name: this.DocDetails[i].name
    //     }
    //     Mod.DocDetails.push(obj);
    //   }
    // }
    Mod.Void ='N';
    return Mod
  }
  onBack(){
    this.router.navigate(['/EmployeeMasterList'], { relativeTo: this.route });
  }

  onClear(){
      //  window.location.reload();
      this.model = new EmployeeMasterModel();
      this.Marriage = false;
      this.isUpdate = false;
      this.setDate();  
      this.QualificationDet = [];
      this.QualificationRowDet = [];
      this.PersonalDet = [];
      this.ChildDet = [];
      this.QualificationDet.push({Class:null});
      let obj2 = {
        Class: null,
        NameofIns: null,
        YrPassing: null,
        Grade: null,
        Subjectoffered: null,
        QualifyCertificate: null
      }
      this.QualificationRowDet.push(obj2)
  }

  onClearDetails(i,type){
    if (type == 'Dependent'){
      this.ChildDet[i].Emp_Dep = null;
      this.ChildDet[i].DependentType = null;
      this.ChildDet[i].DateofBrith = null;
      this.ChildDet[i].Age = null;
      this.ChildDet[i].DependentPhoto = null;
      this.ChildDet[i].ContactNo = null;
      this.ChildDet[i].EmailId = null;
    } 
    else if (type == 'Qualification'){
      this.QualificationRowDet[i].Class = null;
      this.QualificationRowDet[i].NameofIns = null;
      this.QualificationRowDet[i].YrPassing = null;
      this.QualificationRowDet[i].Grade = null;
      this.QualificationRowDet[i].Subjectoffered = null;
      this.QualificationRowDet[i].QualifyCertificate = null;
    }
  }

  onblurEmployee(event,Type){
    if(Type == 'Code'){
      if(!event.target.validity.valid){
        this.model.Emp_Code = null;
      }
      if(event.target.ariaInvalid == 'true'){
        this.model.Emp_Code = null;
        this.toastr.warning("Special character not allowed this field.")
      }
    }
    if(Type == 'Name'){
      if(!event.target.validity.valid){
        this.model.Emp_Name = null;
      }
      if(event.target.ariaInvalid == 'true'){
        this.model.Emp_Name = null;
        this.toastr.warning("Special character not allowed this field.")
      }
    }
    if(Type == 'destination'){
      if(!event.target.validity.valid){
        this.EmpDestination = null;
      }
    }
    if(Type == 'type'){
      if(!event.target.validity.valid){
        this.Emptype = null;
      }
    }
  }
  onblurPersonalDet(event,type,row){
    if (type == 'Child'){
      if(!event.target.validity.valid){
        this.PersonalDet[row].Emp_Dep = null;
      }
      if(event.target.ariaInvalid == 'true'){
        this.PersonalDet[row].Emp_Dep = null;
        this.toastr.warning("Special character not allowed this field.")
      }
    } else if (type == 'Spouse'){
      if(!event.target.validity.valid){
        this.model.Spouse = null;
      }
      if(event.target.ariaInvalid == 'true'){
        this.model.Spouse = null;
        this.toastr.warning("Special character not allowed this field.")
      }
    }
  }
  onblurQuatifyDet(event,row){
    if(!event.target.validity.valid){
      this.QualificationDet[row].Class = null;
    }
    if(event.target.ariaInvalid == 'true'){
      this.QualificationDet[row].Class = null;
      this.toastr.warning("Special character not allowed this field.")
    }
  }
  onblurEmpSpouse(event,Type){
    if(Type == 'name'){
      if (!event.target.validity.valid){
        this.model.Spouse = null;
      }
    }
    if(Type == 'sp_type'){
      if (!event.target.validity.valid){
        this.SpouseType = null;
      }
    }
    if (Type == "ED_type"){
      if (!event.target.validity.valid){
        this.EDependentType = null;
      }
    }
    if(Type == 'Cell'){
      if (!event.target.validity.valid){
        this.model.SCellNo = null;
      }
    }
    if(Type == 'Email'){
      if (!event.target.validity.valid){
        this.model.SEmailId = null;
      }
    }
  }

  
  validateDependent(event,i,Type){
    if (Type == 'Age'){
      if (!event.target.validity.valid){
        this.ChildDet[i].Age = null;
      }
      if (this.ChildDet[i].Age < 1){
        this.ChildDet[i].Age = null;
      }
    }
    if(Type == 'Phone'){
      if (!event.target.validity.valid){
        this.ChildDet[i].ContactNo = null;
      }
    }
    if(Type == 'Email'){
      if (!event.target.validity.valid){
        this.ChildDet[i].EmailId = null;
      }
    }
  }
  
  validateQualification(event,i,Type){
    if (Type == 'institute'){
      if (!event.target.validity.valid){
        this.QualificationRowDet[i].NameofIns = null;
      }
    }
    if(Type == 'Year'){
      if (!event.target.validity.valid){
        this.QualificationRowDet[i].YrPassing = null;
      }
      if (this.QualificationRowDet[i].YrPassing < 0 || this.QualificationRowDet[i].YrPassing.length < 4 || this.QualificationRowDet[i].YrPassing.length > 4){
        this.QualificationRowDet[i].YrPassing = null;
      }
      const today = new Date();
      let yr = today.getFullYear();
      if (this.QualificationRowDet[i].YrPassing > yr){
        this.QualificationRowDet[i].YrPassing = null;
      }
    }
    if(Type == 'Grade'){
      if (!event.target.validity.valid){
        this.QualificationRowDet[i].Grade = null;
      }
      if (this.QualificationRowDet[i].Grade < 0){
        this.QualificationRowDet[i].Grade = null;
      }
    }
    if(Type == 'offer'){
      if (!event.target.validity.valid){
        this.QualificationRowDet[i].Subjectoffered = null;
      }
    }
  }

}
