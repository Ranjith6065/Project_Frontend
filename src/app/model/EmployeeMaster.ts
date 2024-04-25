export class EmployeeMasterModel {
 Emp_Code: string;
 Emp_Type: string;
 Emp_Name: string;
 DOB: Date;
 Emp_Designation: string;
 DOJ: Date;
 Spouse: string;
 Void: string;
 Children: string;
 Matriculation: string;
 Intermidiate: string;
 Bachelors: string;
 Masters: string;
 Emp_Image: string;
 Emp_MarriageCertificate: string;
 PersonalDet: PersonalDetails[];
 QualificationDet: QualificationDetails[];
 DocDetails: DoucumentDet[];
 DependentDet: DependentDet[];
 QualificationRowDet: QualificationRowDet[]

 SpouseType: string;
 DOW: Date;
 SCellNo: string;
 SDOB: Date;
 SEmailId: string;
 SImage: string;
}

export class PersonalDetails{
    Mar_Status: string;
    Emp_Spouse: string;
    Emp_Dep: string;
}

export class QualificationDetails{
    Class: string;
}

export class DoucumentDet{
    name: string;
    Emp_Uploads: string;
    type: string;
}

export class DependentDet{
    Emp_Dep: string;
    DependentType: string;
    DateofBrith: Date;
    Age: string;
    DependentPhoto: string;
    EmailId: string;
    ContactNo : string
}

export class QualificationRowDet{
    Class: string;
    NameofIns: string;
    YrPassing: number;
    Grade: number;
    Subjectoffered: string;
    QualifyCertificate : string
}
