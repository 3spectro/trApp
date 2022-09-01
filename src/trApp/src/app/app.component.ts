import { map, Observable, Subject } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoged$!: Observable<boolean>;

  constructor(
    private readonly auth: AuthService
  ) {
    this.isLoged$ = this.auth.user$;
  }

  ngOnInit(): void {
    /*this.auth.user$.subscribe(user => {
      console.log(user);
    });*/
    this.auth.validate();
  }
}
