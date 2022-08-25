import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { LoadingBarComponent } from './shared/components/loading-bar/loading-bar.component';
import { NgxLoadingModule } from "ngx-loading";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PageNotFoundComponent,
    LoadingBarComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({}),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'decreasing'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
