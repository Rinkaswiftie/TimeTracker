import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {HttpResponse} from '@angular/common/http';
import {StatusCodes} from 'http-status-codes';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loginForm!: FormGroup;
  loading!: boolean;
  serverValidation: string;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  signUp(): void {
    this.serverValidation = '';
    if (this.loginForm.get('password') !== this.loginForm.get('confirmPassword')) {
      this.snackBar.open('Passwords do not match', 'I\'ll fix it!', {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
    const user = {
      firstName: this.loginForm.get('firstName')?.value,
      lastName: this.loginForm.get('lastName')?.value,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.loading = true;

    this.authService.signUp(user)
      .subscribe((result: HttpResponse<any>) => {
        if (result.status === StatusCodes.CREATED) {
          this.authService.handleSuccessFullAuth(result.body.refreshToken);
        } else if (result.status === StatusCodes.BAD_REQUEST) {
          this.snackBar.open(result.body, 'I\'ll fix it!', {
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        } else {
          this.authService.logout();
        }
      }, error => console.log(error));
  }
}
