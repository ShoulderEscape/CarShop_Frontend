import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarFormComponent } from 'src/components/pages/car-form/car-form.component';
import { AboutComponent } from 'src/components/pages/about/about.component';
import { HomeComponent } from 'src/components/pages/home/home.component';
import { LoginComponent } from 'src/components/pages/login/login.component';
import { ProfileComponent } from 'src/components/pages/profile/profile.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent },
  {path: 'profile', component: ProfileComponent },
  {path: 'login', component: LoginComponent },
  {path: 'car-form', component: CarFormComponent },
  {path: '', redirectTo: '/home',pathMatch: 'full' }


 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
