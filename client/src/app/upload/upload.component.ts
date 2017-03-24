import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SharedService } from "./../services/shared.service";
import { DropzoneModule } from 'angular2-dropzone-wrapper';
import { DropzoneConfigInterface } from 'angular2-dropzone-wrapper';
import { AppSettings } from "../app.settings";
import { AuthenticationService } from '../services/authentication.service';
 
// const DROPZONE_CONF: DropzoneConfigInterface = {
//   server: AppSettings.API_ENDPOINT + 'upload',
//   method: 'post',
//   maxFilesize: 50,
//   acceptedFiles: 'image/*',
//   headers: {'x-access-token' : (TOKEN ? TOKEN()['token'] : null)}
// };
 
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {
    constructor(private _sharedService: SharedService, private router: Router) {
    }
    
    ngOnInit() {
    }
 
    onUploadError(args: any) {
      console.log('onUploadError:', args);
    }

  onUploadSuccess(args: any) {
    if(args[1].ok)
      this.router.navigate(['/images']);
    console.log('onUploadSuccess:', args);
  }
  
  onSending(args: any) {
    args[1].setRequestHeader("x-access-token", JSON.parse(localStorage.getItem('currentUser'))['token']);
  }

}
// export const DROPZONE_CONFIG = DropzoneModule.forRoot(DROPZONE_CONF)