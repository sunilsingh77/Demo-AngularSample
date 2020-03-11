import { Component, OnInit } from '@angular/core';
import { trigger,query,style,stagger,animate,transition } from '@angular/animations'
@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss'],
    animations: [
        trigger('photosAnimation', [
          transition('* => *', [
            query('img',style({ transform: 'translateX(100%)'})),
            query('img',
              stagger('300ms', [
                animate('700ms', style({ transform: 'translateX(0)'}))
            ]))
          ])
        ])
      ]
})
export class ProfileComponent implements OnInit {

  constructor() { }
 
  photos:any[]=[{photo:'./assets/img/1.jpg'},{photo:'./assets/img/2.jpg'},{photo:'./assets/img/3.jpg'}
,{photo:'./assets/img/1.jpg'},{photo:'./assets/img/2.jpg'},{photo:'./assets/img/3.jpg'}]
  ngOnInit() {
  }

}
