import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = 'http://localhost:6060';

  constructor(private http: HttpClient) { }

  GetData() {
    this.http.get('/')
  }

  getUserList(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/login/api/userList")
  }
}
