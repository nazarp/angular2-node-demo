import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../services/shared.service";
 
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styles: []
 
})

export class ImagesComponent implements OnInit {
  
  images: any[] = [];
  
  constructor(private _sharedService: SharedService) {
  }
 
  ngOnInit() {
    this.getUserImages();
  }
 
  getUserImages(){
    this._sharedService.getImages()
    .subscribe(
      lstresult => { 
        this.images = lstresult;
      },
      error => {
        console.log("Error: ");
        console.log(error);
      }
      ); 
  }
  
}