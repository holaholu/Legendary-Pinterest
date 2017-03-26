import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Globals } from '../globals';
import { PinsService } from '../pins.service';

@Component({
  selector: 'app-pinboard',
  templateUrl: './pinboard.component.html',
  styleUrls: ['./pinboard.component.css']
})
export class PinboardComponent implements OnInit {

constructor(private pinsService: PinsService,private globals: Globals,private router: Router) { }


  ngOnInit() {

     setTimeout( ()=>{
if (this.globals.loggedin==true) {}else {
   this.router.navigate(['/login']);
}
  }, 1000);
  }

}
