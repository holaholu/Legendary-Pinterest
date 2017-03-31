import { Component, OnInit } from '@angular/core';
import { PinsService } from '../pins.service';
import { Router} from '@angular/router';
import { Globals } from '../globals';
//import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password="";username="";errorMsg="";user; 

constructor(private router: Router,private pinsService:PinsService,private globals: Globals) { }


 onsubmit(){
 //loginup and get user

    this.pinsService.logIn(this.username,this.password)
       .subscribe(res => {
      this.globals.name = res, posterror => this.errorMsg=posterror ;});
  
// Go to home page
setTimeout(()=> {

  if(this.globals.name.length < 1){
    this.router.navigate(['/login']);
    this.globals.loggedin=false;
   // this._flashMessagesService.grayOut(true);
    //this._flashMessagesService.show("Your username or password is incorrect", { timeout: 2500,cssClass: 'alert-danger' });
  } else {
     this.router.navigate(['/pinboard']);
    this.globals.loggedin=true;
  }
  
}, 2000);


}

  ngOnInit() {
  }

}
