import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _snackBar: any;

  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'));
        console.log("LOGGED IN!");
      })
    )
  }


  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        console.log(res);
        this.setSession(res.body._id, res.headers.get('x-access-token'));
        console.log("Successfully signed up and now logged in!");
      })
    )
  }



  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }


  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken(){
    return localStorage.getItem('x-refresh-token') || '';
  }


  getUserId() {
    return localStorage.getItem('user-id') || ' ';
  }

  setAccessToken(accessToken: any) {
    localStorage.setItem('x-access-token', accessToken)
  }

  private setSession(userId: any, accessToken: any) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }

  isAuthenticated() {
    const token = localStorage.getItem('x-access-token') || "";
    if (token === 'undefined' || token === null || token === "") {
      return false;
    } else {
      const decodedToken = jwt_decode<any>(token) || "{}";
      if (decodedToken.exp < new Date().getTime()/1000) {
        return false;
      } else {
        return true;
      }
    }
  }

}


