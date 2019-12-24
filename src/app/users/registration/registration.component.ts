import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  private readonly notifier: NotifierService;
  constructor(
    private  authService: AuthService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  formRegistration = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit() {
  }

  register() {
    const email = this.formRegistration.value.email;
    const password = this.formRegistration.value.password;
    this.authService.register(email, password).then( res => {
      if ( res !== null) {
        this.notifier.notify('error', res.message);
      }
    });
  }

}
