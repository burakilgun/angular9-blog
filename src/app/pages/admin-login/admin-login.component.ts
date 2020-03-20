import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(email: string, password: string) {
    this.authService.isAuthenticated(email, password).subscribe(resp => {
      if (resp.status == true) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        this.router.navigate(["/admin"]);
      } else {
        alert("Email veya şifre hatalı.")
      }
    });
  }

}
