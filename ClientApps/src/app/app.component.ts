import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { slideInAnimation } from './shared/animation';
import { RouterOutlet, Router } from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'Test';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

    reason = '';
  UserName: Observable<string> = of('');

  constructor(private router: Router, public ref: ChangeDetectorRef) {
        let userData = localStorage["User"];
        this.UserName = of(userData && userData != undefined && userData !="[]" ? JSON.parse(localStorage["User"])[0].Email : '');
    
    
    };

    isLoggedIn(): boolean {
      let userData = localStorage["User"];
      this.UserName = of(userData && userData != undefined && userData != "[]" ? JSON.parse(localStorage["User"])[0].Email : '');
      return (userData && userData != "[]" && JSON.parse(localStorage["User"])[0].Email) ? true : false;
     
    }
   
    logout() {
        localStorage.clear();
        this.router.navigate(["/login"])
    }
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }


}
