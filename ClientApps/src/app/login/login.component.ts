import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar';
import { LoginCredential } from '../models/login-credential';
import { CommonService } from '../services/httpServices/common.service';
import { AuthService } from '../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  hide = true;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    public _commService: CommonService,
    public _authService: AuthService,
    private router: Router,
  ) { }
  photos: any[] = [{ photo: './assets/img/1.jpg' }];


  ngOnInit() {
    this.createForm();
  }
  ngAfterViewInit() {
    //this.loaders.color
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]]
    })
  }
  onLogin() {
    debugger;
    let credential = this.preparedata();
    this._authService.login(credential).subscribe(res => {
      if (res && res != undefined && res != null) {
        localStorage.setItem('User', JSON.stringify(res));
        this.router.navigate(['/home'])
      }
    });

  }
  preparedata(): LoginCredential {
    const _cred = new LoginCredential();
    let ctrls = this.loginForm.controls;
    _cred.Email = ctrls["email"].value;
    _cred.Password = ctrls["password"].value;

    return _cred;
  }
}
