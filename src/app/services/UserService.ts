import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  private baseUrl = 'https://localhost:7225';

  constructor(private http: HttpClient) {}

  public registerUser(registrationData: any) {
    const dataToSend = {
      Username: registrationData.username,
      Password: registrationData.password,
    };

    return this.http.post(`${this.baseUrl}/api/account`, dataToSend);
  }
}
