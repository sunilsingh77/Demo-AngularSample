import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../services/httpServices/common.service';
import { AuthService } from '../services/authService/auth.service';
import { LoginCredential } from '../models/login-credential';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  hide=true;
  registerForm:FormGroup;
  constructor(private fb:FormBuilder,
    public _commService:CommonService,
    public _authService: AuthService,
    private router:Router,
    ) { }
  photos: any[] = [{ photo: './assets/img/1.jpg' }];

  
ngOnInit() {
this.createForm();
  }
ngAfterViewInit(){
  //this.loaders.color
}
createForm(){
this.registerForm=this.fb.group({
  email:['',[Validators.required,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
  password:['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]],
    fName:['',[Validators.required]],
    lName: ['', [Validators.required]],
    phone: ['', [Validators.pattern(/^[0-9]*$/)]],
})
}
onSignup(){
  let credential = this.preparedata();
  this.router.navigate(["/login"]);
  this._authService.register(credential).subscribe(x => {
    
    console.log(x);
  });

}
preparedata():LoginCredential{
  const _cred=new LoginCredential();
    let ctrls = this.registerForm.controls;
    _cred.Email = ctrls["email"].value;
  _cred.Password=ctrls["password"].value;
    _cred.FirstName = ctrls["fName"].value;
    _cred.LastName = ctrls["lName"].value;
    _cred.Phone = ctrls["phone"].value;
 
  return _cred;
}

}
