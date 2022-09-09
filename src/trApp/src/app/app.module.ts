import { TranslateApiDataService } from './shared/services/translate-api-data.service';
import { NgxTranslateModule } from './translate/translate.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { LoadingBarComponent } from './shared/components/loading-bar/loading-bar.component';
import { NgxLoadingModule } from "ngx-loading";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RequestInterceptorService } from './shared/interceptors/request-interceptor.service';
import { ResponseInterceptorService } from './shared/interceptors/response-interceptor.service';
import { LoginGuard } from 'src/app/shared/guards/login.guard';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    LoadingBarComponent,
    LoginComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({}),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'decreasing'
    }),
    NgxTranslateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptorService,
      multi: true
    },
    LoginGuard,
    TranslateApiDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
