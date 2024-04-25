
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Configrution } from 'src/app/pages/Configuration/Configuration';

@Injectable({
  providedIn: 'root'
})
export class ItemMasterService {

  // constructor(private _http: HttpClient) { }

  private APIUrl: string;
  constructor(private _http: HttpClient, public lurl: Configrution) {
    console.log(this.APIUrl);
  }

  // GetAll(): Observable<any>{
  //   return this._http.get('http://localhost:8090/api/getitems');
  // }
  async GetAll(): Promise<any> {
    this.APIUrl = this.lurl.APIUrl + 'ItemMaster/getitems';
    const response = await this._http.get(this.APIUrl).toPromise();
    return response;
  }
  
  async GetUOMAll(): Promise<any> {
    this.APIUrl = this.lurl.APIUrl + 'GetUOMAll';
    const response = await this._http.get(this.APIUrl).toPromise();
    return response;
  }

  // GetUOMAll(): Observable<any>{
  //   return this._http.get('http://localhost:8090/api/GetUOMAll');
  // }
  
  // GetPOSAll(): Observable<any>{
  //   return this._http.get('http://localhost:8090/api/GetPosAll');
  // }
  async GetPOSAll(): Promise<any> {
    this.APIUrl = this.lurl.APIUrl + 'GetPosAll';
    const response = await this._http.get(this.APIUrl).toPromise();
    return response;
  }

  // GetItem(desc: any): Observable<any>{
  //   return this._http.get(`http://localhost:8090/api/getbyitems/${desc}`);   
  //   //  return this._http.get('http://localhost:8090/api/getbyitems?id=' + desc);
  // }
  
  async GetItem(desc: any): Promise<any> {
    this.APIUrl = this.lurl.APIUrl + 'ItemMaster/getbyitems?ItemDescription='+ desc;
    const response = await this._http.get(this.APIUrl).toPromise();
    return response;
  }
  async GetItemDet(desc: any): Promise<any> {
    this.APIUrl = this.lurl.APIUrl + 'ItemMaster/getbyitemsdet?ItemDescription='+ desc;
    const response = await this._http.get(this.APIUrl).toPromise();
    return response;
  }

  async GetExportbyID(item): Promise<any> {
    this.APIUrl = this.lurl.APIUrl + 'ItemMaster/GetExportbyID?ItemDescription='+ item;
    const response = await this._http.get(this.APIUrl).toPromise();
    return response;
  }
  // GetItemDet(desc: any): Observable<any>{
  //   return this._http.get(`http://localhost:8090/api/getbyitemsdet/${desc}`);   
  //   //  return this._http.get('http://localhost:8090/api/getbyitems?id=' + desc);

  // }
  // SaveItem(data: any): Observable<any>{
  //   return this._http.post('http://localhost:8090/api/insertitems', data);
  // }

  async CRUD(entity: any):  Promise<any> {
    if (entity.OpsType.toLowerCase() == "s") {
      this.APIUrl = this.lurl.APIUrl + 'ItemMaster/insertitems'; 
    } else if (entity.OpsType.toLowerCase() == "u") {
      this.APIUrl = this.lurl.APIUrl + 'ItemMaster/Updateitem'; 
    } else if (entity.OpsType.toLowerCase() == "v") {
      this.APIUrl = this.lurl.APIUrl + 'ItemMaster/Voiditems';
    } else if (entity.OpsType.toLowerCase() == "p") {
      this.APIUrl = this.lurl.APIUrl + 'ItemMaster/setReport';
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    let options = {
      headers: headers,
    };
    const response = await this._http.post(this.APIUrl, entity, options).toPromise();
    return response;
  }

}
