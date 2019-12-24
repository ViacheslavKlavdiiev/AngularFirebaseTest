import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './users/login/login.component';
import {RegistrationComponent} from './users/registration/registration.component';


const routes: Routes = [
  {
    path:  '',
    children: [
      // [...]
      { path:  'login', component:  LoginComponent},
      { path:  'registration', component:  RegistrationComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
