import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  _url = "http://localhost:3000/posts";

  constructor(private _http: HttpClient) { }

  postEmployee(data: any) {
      return this._http.post<any>(this._url, data)
      .pipe(map((res: any) => {
        return res;
    }))
  }

   getEmployee() {
    return this._http.get<any>(this._url)
    .pipe(map((res: any) => {
      return res;
  }))
 }

 updateEmployee(data: any, id: number) {
   return this._http.put<any>(this._url+id,data)
   .pipe(map((res: any) => {
    return res;
    }))
}

  deleteEmployee(id: number){
    return this._http.delete<any>(this._url+id)
    .pipe(map((res: any) => {
      return res;
      }))
  } 

}
