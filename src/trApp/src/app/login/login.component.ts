import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(
    private readonly toastrService: ToastrService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  login () {
    this.authService.login(this.username, this.password).subscribe(x => {
      if (x) {
        this.router.navigate(['journeys']);
      } else {
        this.toastrService.error('User or password incorect');
      }
    });
  }
}
