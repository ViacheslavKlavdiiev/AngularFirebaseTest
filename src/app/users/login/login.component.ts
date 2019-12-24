import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly notifier: NotifierService;
  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  error = '';

  constructor(
    private  authService: AuthService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.formLogin.value.email, this.formLogin.value.password).then( res => {
        if ( res !== null) {
          this.error = res.message;
          this.notifier.notify('error', res.message);
        }
    });
  }
}
