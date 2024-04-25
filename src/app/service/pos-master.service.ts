import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configrution } from '../pages/Configuration/Configuration';

@Injectable({
  providedIn: 'root'
})
export class PosMasterService {

  private APIUrl: string;
  constructor(private _http: HttpClient, public lurl: Configrution) { }


  // SavePOS(data: any): Observable<any>{
  //   return this._http.post('http://localhost:8090/api/InsertPOS', data);
  // }
  
  async SavePOS(entity: any):  Promise<any> {
    this.APIUrl = this.lurl.APIUrl + '/InsertPOS'; 
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
