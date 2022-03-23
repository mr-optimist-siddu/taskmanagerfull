import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onLoginButtonClicked(email: string, password: string) {
    if (email.trim() === "" && password.trim() === "") {
      this._snackBar.open('Required Valid Credentials', '', {
        duration: 5000,
      });
    };
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        this._snackBar.open('Successfully logged In', '', {
          duration: 5000,
        })
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/lists']);
        } 
      } else if(res.status === 400){
        this._snackBar.open('Required Valid Credentials', '', {
        duration: 5000,
      });
      }
    });
  }
}
