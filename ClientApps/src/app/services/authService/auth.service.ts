import { Injectable } from '@angular/core';
import { LoginCredential } from 'src/app/models/login-credential';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl = 'http://localhost:6060';

  login(credential: LoginCredential) {

    return this.http.get<any[]>(this.baseUrl + '/login/api/login?userName=' + credential.Email + "&password=" + credential.Password);
  }

  getCredential(credential): Observable<any> {
    return;
  }

  register(credential) {
    return this.http.post<any[]>(this.baseUrl + "/login/api/signup", credential);
  }
}
