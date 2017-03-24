import { Routes, RouterModule } from '@angular/router';
import { ImagesComponent } from "./images/images.component";
import { UploadComponent } from "./upload/upload.component";
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const MAINMENU_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'images', component: ImagesComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/images', pathMatch: 'full' }
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);