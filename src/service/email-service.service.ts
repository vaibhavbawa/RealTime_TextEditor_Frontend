import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  constructor(private http:HttpClient) { }

 sendEmail(email: string, URL: string, params:any):Observable<any> {
// console.log(email, URL, params);
console.log("paramssss",params);


    let body = {
      email:email,
      URL:URL,
    }
     return this.http.post<any>(`http://192.168.1.9:3000/send-email/${params}`, body);
  }

}
