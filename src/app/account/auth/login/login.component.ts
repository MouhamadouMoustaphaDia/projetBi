import { logging } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { UserModel } from 'src/app/core/models/auth.models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  user: UserModel = {
    email: '',
    password: '',
  };

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;


  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      password: ['123', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
   // this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    //this.router.navigate(['/image']);
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {

      this.user.email = "Moustapha";
      this.user.password = this.f.password.value;
      console.log(this.user);
        this.userService.login(this.user).subscribe((response:any) => {
          console.log(response);
          this.saveToken(response['token']);
          this.router.navigate(['/image']);
          // if (response.status == 200) {
          //   console.log("this.user");
          //   this.router.navigate(['/account/login']);
          // }
          // console.log("this.user");
        });

    }
  }

  saveToken(token: string) {
    localStorage.setItem('auth_app_token', token);
   // console.log(token);
  }
}
