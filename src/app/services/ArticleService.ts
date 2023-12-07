import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
    providedIn: 'root',
  })
  export class ArticleService {
    private baseUrl = 'https://localhost:7225';
  
    constructor(private http: HttpClient) {}
  
    public getArticles(): Observable<any[]>{
        return this.http.get<any[]>(`${this.baseUrl}/CarShop/Article`);  
        
      };

      public CreateArticle(car: Car): Observable<any> {
        // const dataToSend = {
      
        //   brand: car.brand,
        //   model: car.model,
        //   year: car.year,
        //   mileAge: car.mileAge,
        //   fuelType: car.fuelType,
        //   transmission: car.transmission,
        //   contactName: car.contactName,
        //   contactNumber: car.contactNumber,
        //   price: car.price,
        //   description: car.description,
        //   imagelink: car.imagelink,
        //   auctionDateTime: car.auctionDateTime
        // };
        console.log(car);
        return this.http.post(`${this.baseUrl}/CarShop/Article/CreateCar`, car);

      }


    }

    // @Injectable({
    //   providedIn: 'root',
    // })
    // export class CreateArticleService {
    //   private baseUrl = 'https://localhost:7225';
    
    //   constructor(private http: HttpClient) {}


    
      


  