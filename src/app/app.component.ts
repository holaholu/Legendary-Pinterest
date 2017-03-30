import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Globals } from './globals';
import { PinsService } from './pins.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   store;errorMsg;
  user=this.globals.loggedin;

 logOut() {
  
  this.globals.loggedin=false;
  this.globals.name =(function () { return; })();
  //this.router.navigate(['/logout']);
}

getStore(){
 
  if(this.globals.name.length < 1){
    this.globals.loggedin=false;
  } else {
    this.globals.loggedin=true;
  }
}

constructor(private pinsService: PinsService,private globals: Globals,private router: Router) { }

  ngOnInit() {
        this.globals.loggedin=false;
         this.pinsService.getUser()
       .subscribe(res => {
      this.globals.name = res, posterror => this.errorMsg=posterror ;});
   
  setTimeout(()=>{
    //alert( this.globals.name);
this.getStore();
  }, 500);
     
 
  
  
  }

}
