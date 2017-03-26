import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Globals } from '../globals';
import { PinsService } from '../pins.service';

@Component({
  selector: 'app-recentpins',
  templateUrl: './recentpins.component.html',
  styleUrls: ['./recentpins.component.css']
})
export class RecentpinsComponent implements OnInit {

 constructor(private pinsService: PinsService,private globals: Globals,private router: Router) { }


  ngOnInit() {

 setTimeout( ()=>{
if (this.globals.loggedin==true) {}else {
   this.router.navigate(['/login']);
}
  }, 1000);

  }

}
