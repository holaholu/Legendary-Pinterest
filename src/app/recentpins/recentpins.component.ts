import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Globals } from '../globals';
import { PinsService } from '../pins.service';
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-recentpins',
  templateUrl: './recentpins.component.html',
  styleUrls: ['./recentpins.component.css']
})
export class RecentpinsComponent implements OnInit {
imagelist;errorMsg;
 constructor(private pinsService: PinsService,private globals: Globals,private router: Router) { }


  ngOnInit() {

    this.pinsService.getRecent()
       .subscribe(res => {
      this.imagelist = res, posterror => this.errorMsg=posterror ;});

 setTimeout( ()=>{
if (this.globals.loggedin==true) {}else {
   this.router.navigate(['/login']);
}
  }, 1000);

  }

}
