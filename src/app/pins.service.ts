import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PinsService {

constructor(private http: Http) { }
 
 // Sign user up and return username
  signUp(name,password,email) {
    return this.http.post('/signup',{username:name,email:email,password:password})
      .map(res => res.text()).catch(this._errorHandler);
  }
  //?username='+myEmail+"&password="+myPassword+"&name="+myName
  logIn(name,password) {
    return this.http.post('/login',{username:name,password:password})
      .map(res => res.text()).catch(this._errorHandler);
  }

  getUser() {
    return this.http.get('/getuser')
      .map(res => res.text()).catch(this._errorHandler);
  }

  settings(password){
    return this.http.post('/settings',{password:password})
      .map(res => res.text()).catch(this._errorHandler);
  }

addImage(title,url) {
    return this.http.post('/addimage',{title:title,url:url})
      .map(res => res.json()).catch(this._errorHandler);
  }
  getImage(){
    return this.http.get('/getimage')
      .map(res => res.json()).catch(this._errorHandler);
  }
 getRecent(){
    return this.http.get('/getrecent')
      .map(res => res.json()).catch(this._errorHandler);
  }

   _errorHandler(error:Response){
          console.error(error);
          return Observable.throw(error || "Server Error");
      }




}
