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
        
        return this.http.post(`${this.baseUrl}/CarShop/Article/CreateCar`, car);

      }


    }

    // @Injectable({
    //   providedIn: 'root',
    // })
    // export class CreateArticleService {
    //   private baseUrl = 'https://localhost:7225';
    
    //   constructor(private http: HttpClient) {}


    
      


  