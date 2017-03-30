import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Globals } from '../globals';
import { PinsService } from '../pins.service';
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-pinboard',
  templateUrl: './pinboard.component.html',
  styleUrls: ['./pinboard.component.css']
})
export class PinboardComponent implements OnInit {
title; url;imagelist;errorMsg;
addbutton:boolean=true;addform:boolean=false;


 
 options: MasonryOptions = {
    transitionDuration: '1s'
  }

  showform() {
    this.addform=true;
    this.addbutton=false;
 
  }

onsubmit() {
  
    this.pinsService.addImage(this.title,this.url)
       .subscribe(res => {
      this.imagelist = res, posterror => this.errorMsg=posterror ;});

     setTimeout( ()=>{
      
       this.addform=false;
       this.addbutton=true;
       this.title="";
       this.url="";
        }, 1000);
}

constructor(private pinsService: PinsService,private globals: Globals,private router: Router) { }


  ngOnInit() {
       this.pinsService.getImage()
       .subscribe(res => {
      this.imagelist = res, posterror => this.errorMsg=posterror ;});


     setTimeout( ()=>{
     
if (this.globals.loggedin==true) {}else {
   this.router.navigate(['/login']);
}

  }, 2000);
  }

}
