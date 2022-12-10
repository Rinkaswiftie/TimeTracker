import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserModel} from '../../auth/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {StatusCodes} from 'http-status-codes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<UserModel>(null);
  accessToken = null;
  refreshToken = null;
  refreshTokenKey = 'TimeTrackerLogin-refresh';
  refreshInterval = null;
  tokenExpiration = 20 * 60 * 1000;


  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(userInfo: UserModel): Observable<any>{
    return this.http.post(environment.backendURL + '/register', userInfo);
  }

  login(email: string, password: string, keepLoggedIn: boolean): Observable<any> {
    return this.http.post(environment.backendURL + '/login', {
      email,
      password
    });
  }

  handleSuccessFullAuth(refreshToken: string): void {
    this.refreshToken = refreshToken;
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.initiateRefresh();
    this.router.navigate(['/']).then();
  }

  logout(): void {
    localStorage.removeItem(this.refreshTokenKey);
    this.refreshToken = null;
    this.accessToken = null;
    this.user.next(null);
    this.terminateRefresh();
    this.router.navigate(['/auth', 'login']).then();
  }

  initiateRefresh(): void {
    this.refreshAccess();
    this.refreshInterval = setInterval(this.refreshAccess, 0.9 * this.tokenExpiration);
  }

  terminateRefresh(): void {
    clearInterval(this.refreshInterval);
  }

  private refreshAccess(): void {
    if (!this.refreshToken) { this.refreshToken = localStorage.getItem(this.refreshTokenKey); }
    if (this.refreshToken) {
      this.http.post(environment.backendURL + '/refresh', this.refreshToken)
        .subscribe((response: HttpResponse<{ accessToken: string, userData: UserModel }>) => {
          if (response.status === StatusCodes.ACCEPTED) {
            this.accessToken = response.body.accessToken;
            this.user.next(response.body.userData);
          } else if (response.status === StatusCodes.UNAUTHORIZED) {
            // if refresh token has expired
            this.logout();
          }
        });
    } else {
      // if refresh token does not exist
      this.logout();
    }
  }
}
