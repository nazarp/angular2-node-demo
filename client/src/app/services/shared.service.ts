import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { AuthenticationService } from '../services/authentication.service';
 
@Injectable()
export class SharedService {
    
  imagesURL = AppSettings.API_ENDPOINT + "images";
    
  constructor(
    private _http: Http,
    private _AuthenticationService: AuthenticationService
  ) { }
  getImages(){
    var headers = new Headers();
    headers.append('x-access-token', this._AuthenticationService.token);
    return this._http.get(
      this.imagesURL,
      {
      headers: headers
      })
      .map(response => {
          { return response.json() };
      })
      .catch(error => Observable.throw(error.json()));
  }
}