import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
// import { environment } from '../../../../environments/environment';
// import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { AuthService } from '../auth.service';
import { UserRegistrer } from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  user: UserRegistrer = {
    email: '',
    password: '',
    username: ''
  };

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userService: AuthService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {


      this.user.email = this.f.email.value;
      this.user.password = this.f.password.value;
      this.user.username = this.f.username.value;
     // console.log(this.user);
        this.userService.register(this.user).subscribe((response:any) => {
          console.log(response.status);
          this.saveToken(response['token']);
          if (response.status == 200) {
            this.router.navigate(['/account/login']);
            console.log(response.status);
          }
        });

      // if (environment.defaultauth === 'firebase') {
      //   this.authenticationService.register(this.f.email.value, this.f.password.value).then((res: any) => {
      //     this.successmsg = true;
      //     if (this.successmsg) {
      //       this.router.navigate(['/dashboard']);
      //     }
      //   })
      //     .catch(error => {
      //       this.error = error ? error : '';
      //     });
      // } else {
      //   this.userService.register(this.signupForm.value)
      //     .pipe(first())
      //     .subscribe(
      //       data => {
      //         this.successmsg = true;
      //         if (this.successmsg) {
      //           this.router.navigate(['/account/login']);
      //         }
      //       },
      //       error => {
      //         this.error = error ? error : '';
      //       });
      // }
    }
  }

  saveToken(token: string) {
    localStorage.setItem('auth_app_token', token);
  }

}
