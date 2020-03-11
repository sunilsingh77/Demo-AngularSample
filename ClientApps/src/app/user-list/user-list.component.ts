import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/httpServices/common.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: any[] = [];

  constructor(private commonService: CommonService) {  }

  ngOnInit() {
    this.commonService.getUserList().subscribe(res => {
      this.userList = res;
    });
  }
}
