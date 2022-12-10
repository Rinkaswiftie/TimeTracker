import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {HttpResponse} from '@angular/common/http';
import {StatusCodes} from 'http-status-codes';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading!: boolean;
  serverValidation: string;

  constructor(private router: Router, private authService: AuthService, private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
  }

  login(): void {
    this.serverValidation = '';
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;
    this.loading = true;

    this.authService.login(email, password, rememberMe).subscribe((result: HttpResponse<any>) => {
      if (result.status === StatusCodes.CREATED) {
        this.authService.handleSuccessFullAuth(result.body.refreshToken)
      } else if (result.status === StatusCodes.BAD_REQUEST) {
        this._snackBar.open(result.body, 'I\'ll fix it!', {
          horizontalPosition: "center",
          verticalPosition: 'top'
        });
        this.loading = false;
      } else {
        this.authService.logout();
      }
    }, error => console.log(error));

  }

  resetPassword(): void {
    this.router.navigate(['/auth/password-reset-request']);
  }
}
