import { Component, OnInit } from '@angular/core';
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options: MasonryOptions = {
    transitionDuration: '1s'
  }

images= [
  {url:"http://lorempixel.com/400/300/abstract"},
   {url:"http://lorempixel.com/400/600/abstract"},
    {url:"http://lorempixel.com/800/600/abstract"},
     {url:"http://lorempixel.com/1200/1200/abstract"},
    {url:"http://lorempixel.com/400/300/"},
   {url:"http://lorempixel.com/400/600/"},
    {url:"http://lorempixel.com/800/600/"},
     {url:"http://lorempixel.com/1200/1200/"},
    {url:"http://lorempixel.com/400/300/sports"},
   {url:"http://lorempixel.com/400/600/sports"},
    {url:"http://lorempixel.com/800/600/sports"},
     {url:"http://lorempixel.com/1200/1200/sports"},
]


  constructor() { }

  ngOnInit() {
  }

}
