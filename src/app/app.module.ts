import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from 'src/components/partial-views/footer/footer.component';
import { HeaderComponent } from 'src/components/partial-views/header/header.component';
import { AboutComponent } from 'src/components/pages/about/about.component';
import { CarComponent } from 'src/components/partial-views/car/car.component';
import { CarFormComponent } from 'src/components/pages/car-form/car-form.component';
import { HomeComponent } from 'src/components/pages/home/home.component';
import { FilterComponent } from 'src/components/pages/home/filter/filter.component';
import { LoginComponent } from 'src/components/pages/login/login.component';
import { ProfileComponent } from 'src/components/pages/profile/profile.component';
import { RegisterComponent } from 'src/components/pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    CarComponent,
    CarFormComponent,
    HomeComponent,
    FilterComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
