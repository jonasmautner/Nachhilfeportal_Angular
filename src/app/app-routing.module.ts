import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Komponenten für Routing
import { HomeComponent } from './home/home.component';
import { LoginAreaComponent } from './login-area/login-area.component';
import { LoginComponent } from './login/login.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { RegisterComponent } from './register/register.component';

//import { CanNavigateToAdminGuard } from "./can-navigate-to-admin.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/area', component: LoginAreaComponent },
  { path: 'offers/:id', component: OfferDetailComponent },
  { path: 'offers/form', component: OfferFormComponent/*, canActivate:[CanNavigateToAdminGuard] */},
  { path: 'offers/form/:id', component: OfferFormComponent/*, canActivate:[CanNavigateToAdminGuard] */},
  { path: 'register', component: RegisterComponent },
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  //providers: [CanNavigateToAdminGuard]
})

export class AppRoutingModule { }
