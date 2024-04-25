export class ItemMasterModel {
    ItemId: string;
    ItemDescription: string;
    UOM: string;
    TaxPercentage: number;
    ItemRate: number;
    OpenItem: string;
    DateOfCreation: Date;
    Void: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    voidedBy: string;
    voidedAt: Date;
    isUpdate: string;
    isVoid: string;
    OpsType: string;
    POSItemGrid: POSItemGrid[];
    FromDate: Date;
    ToDate: Date;
  }
  export class POSItemGrid {
    RPOSCode: string;
    IsActive: boolean;
    Enable: boolean;
    TaxEnable: boolean;
    Rate: number;
    TaxPercentage: number|null;
    ItemDescription: string;
    Void: string;
    createdBy: string;
  }