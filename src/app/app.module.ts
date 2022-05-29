import { NgModule } from '@angular/core';

// Komponenten
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginAreaComponent } from './login-area/login-area.component';
import { LoginComponent } from './login/login.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { RegisterComponent } from './register/register.component';

// Module
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import {LearningofferService} from "./shared/learningoffer.service";
import {AuthenticationService} from "./shared/authentication.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginAreaComponent,
    LoginComponent,
    OfferDetailComponent,
    OfferFormComponent,
    OfferListComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    LearningofferService, AuthenticationService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
