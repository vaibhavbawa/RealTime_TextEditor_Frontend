import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  constructor(private http:HttpClient) { }

  sendEmail(email: string, URL: string):Observable<any> {
    let body = {
      email:email,
      URL:URL
    }
     return this.http.post<any>('http://localhost:5000/send-email', body);
  }
}
