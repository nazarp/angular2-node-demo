import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ImagesComponent } from './images/images.component';
import { UploadComponent } from './upload/upload.component';
import { CONST_ROUTING } from './app.routing';
import { SharedService} from "./services/shared.service";
import { AuthenticationService } from "./services/authentication.service";
import { DropzoneConfigInterface, DropzoneModule } from 'angular2-dropzone-wrapper';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { AppSettings } from "./app.settings";

const DROPZONE_CONF: DropzoneConfigInterface = {
  server: AppSettings.API_ENDPOINT + 'upload',
  method: 'post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
  // headers: {'x-access-token' : JSON.parse(localStorage.getItem('currentUser'))}
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ImagesComponent,
    UploadComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CONST_ROUTING,
    DropzoneModule.forRoot(DROPZONE_CONF)
  ],
  providers: [
    SharedService,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
