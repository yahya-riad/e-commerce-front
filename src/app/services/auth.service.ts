import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {Injectable} from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'  // Fournit le service dans toute l'application
})
export class AuthService {
  private apiUrl = '/api/token';

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(this.apiUrl, user, { responseType: 'text' })
      .pipe(tap(
          response =>
            localStorage.setItem('token', response)
      ));
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() { 
    return localStorage.getItem('token'); 
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false; 
    }
    return true;
  }

  register(data: any) {
    return this.http.post('/api/account', data);
  }
}
