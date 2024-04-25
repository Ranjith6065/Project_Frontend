
export class ItemReportModel {
    ItemDetails: ItemDetailsEntity[];
    FromDate: Date;
    ToDate: Date;
    Void: string;
    createdBy: string;
    OpsType: string;
    
  }
  export class ItemDetailsEntity{
    ItemDescription: string;
    isChechked : boolean;
  }