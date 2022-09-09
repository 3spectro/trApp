import { TranslateApiDataService } from './../../shared/services/translate-api-data.service';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  siteLanguage = 'English';

  languageList = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ];

  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly translateApiDataService: TranslateApiDataService
  ) { }

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find((language) => language.code === localeCode)
      ?.label.toString();

    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage;
      this.translate.use(localeCode);
      this.translateApiDataService.translate();
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
