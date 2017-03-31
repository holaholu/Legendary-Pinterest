import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Globals } from './globals';
import { AppComponent } from './app.component';
import { PinsService } from './pins.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { FlashMessagesModule } from 'angular2-flash-messages';
import { PinboardComponent } from './pinboard/pinboard.component';
import { RecentpinsComponent } from './recentpins/recentpins.component';
import { SettingsComponent } from './settings/settings.component';
import { MasonryModule } from 'angular2-masonry';
import { MdCardModule } from '@angular2-material/card';
const routes:Routes = [
  {
    path: '',
     component: HomeComponent
   
  },
   {path: 'login',
     component: LoginComponent 
   
  },
   {path: 'signup',
     component: SignupComponent 
   
  },
   {path: 'pinboard',
     component: PinboardComponent
   
  },
   {path: 'recentpins',
     component: RecentpinsComponent
   
  },
   {path: 'settings',
     component: SettingsComponent
   
  }
]



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PinboardComponent,
    RecentpinsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //FlashMessagesModule,
    MasonryModule,
     MdCardModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PinsService,Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
