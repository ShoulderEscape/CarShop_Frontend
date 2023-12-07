import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class ArticleService {
    private baseUrl = 'https://localhost:7225';
  
    constructor(private http: HttpClient) {}
  
    public getArticles(): Observable<any[]>{
        return this.http.get<any[]>(`${this.baseUrl}/CarShop/Article`);  
      };
    }

    @Injectable({
      providedIn: 'root',
    })
    export class CreateArticleService {
      private baseUrl = 'https://localhost:7225';
    
      constructor(private http: HttpClient) {}

      public CreateArticle(formDAta: any) {
        const dataToSend = {
          brand: formDAta.brand,
          model: formDAta.model,
          year: formDAta.year,
          mileAge: formDAta.mileAge,
          fuelType: formDAta.fuelType,
          transmission: formDAta.transmission,
          contactName: formDAta.contactName,
          contactNumber: formDAta.contactNumber,
          price: formDAta.price,
          description: formDAta.description,
          imagelink: formDAta.imagelink,
          auctionDateTime: formDAta.auctionDateTime
        };
    
        return this.http.post(`${this.baseUrl}/CarShop/Article`, dataToSend);
      }
      }


  