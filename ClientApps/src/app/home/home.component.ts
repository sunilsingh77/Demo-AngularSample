import { Component, OnInit, AfterContentInit, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { 
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  constructor() { }
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit() {
    // setInterval(()=>{
    //   this.toggle()
    // },2000)
  }
  

}

