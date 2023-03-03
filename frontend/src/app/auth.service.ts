import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    token: localStorage.getItem('token') ?? [],
    isLoggedIn: localStorage.getItem('isLoggedIn') ?? [],
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    let result = new Promise<string>((resolve, reject) => {
      this.http
        .post(API_URL + 'user/login', { email, password }, httpOptions)
        .subscribe({
          next: (data: any) => {
            localStorage.setItem('isLoggedIn', data.isLoggedIn);
            console.log('asd', data.token);
            localStorage.setItem('token', data.token), resolve(data.token);
          },
          error: (error) => reject(error.message),
        });
    });
    return result;
  }

  testPromise(email: string, password: string) {
    let result = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'user.login', { email, password }).subscribe({
        next: (data: any) => resolve(data.token),
        error: (error) => reject(error.message),
      });
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      API_URL + 'user/register',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }
}
