import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  clearToken() {
    localStorage.removeItem('authToken');
  }

  // ✅ Add this method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken(); // Returns true if a token exists
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}


