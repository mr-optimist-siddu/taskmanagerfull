import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  siteKey: string;
  size: any;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
    this.siteKey = '6LfVaOoeAAAAAMFiEJsaj4m_0GT5iHKZZeZXCMOP';
    this.size = 'Normal';
  }

  ngOnInit() {
  }

  onSignupButtonClicked(email: string, password: string) {
    if (email.trim() === "" && password.trim() === "") {
      this._snackBar.open('Required Valid Credentials', '', {
        duration: 5000,
      });
    };
    this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.router.navigate(['/lists']);
    });
  }

}
