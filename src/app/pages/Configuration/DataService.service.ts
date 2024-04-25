import { Injectable } from '@angular/core';
import { arrow } from '@popperjs/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private dataArraySubject = new BehaviorSubject<any[]>([]);
  // dataArray = this.dataArraySubject.asObservable();

  // updateDataArray(dataArray: any) {
  //   this.dataArraySubject.next(dataArray);
  // }private localStorageKey = 'myData'; // Change this to a meaningful key
  private localStorageKey = ''; 
  getData(): any[] {
    const data = localStorage.getItem('Employee');
    return data ? JSON.parse(data) : [];
  }

  setData(data: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  SetEmployeeDet(data){
    let Array = [];
    if(localStorage.getItem('Employee')){
      Array = JSON.parse(localStorage.getItem('Employee'));
      Array = [data,...Array];
    } else {
      Array = [data];
    }
    localStorage.setItem('Employee',JSON.stringify(Array));
  }
  
}
