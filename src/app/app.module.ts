import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from 'src/components/footer/footer.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { AboutComponent } from 'src/components/about/about.component';
import { CarComponent } from 'src/components/car/car.component';
import { CarFormComponent } from 'src/components/car-form/car-form.component';
import { HomeComponent } from 'src/components/home/home.component';
import { FilterComponent } from 'src/components/home/filter/filter.component';
import { LoginComponent } from 'src/components/login/login.component';
import { ProfileComponent } from 'src/components/profile/profile.component'; //Hello

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    CarComponent,
    CarFormComponent,
    HomeComponent,
    FilterComponent,
    LoginComponent,
    ProfileComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
