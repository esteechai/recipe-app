import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {UserModel} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient, private router: Router ) {
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBymu9qasfFv_JA_jAyk62ZhuVU7n0YvCc',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }).pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBymu9qasfFv_JA_jAyk62ZhuVU7n0YvCc',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }).pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiredIn: number ){
      const expirationDate = new Date(new Date().getTime() + expiredIn * 1000);
      const user = new UserModel(email, userId, token, expirationDate);
      this.user.next(user);
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case'EMAIL_EXISTS':
        errorMsg = "This email exists";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = "Email address or password is invalid";
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'Email address or password is invalid'
        break;
    }
    return throwError(errorMsg);
  }

}
