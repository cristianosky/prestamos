import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'session';
  private isAuthenticated = false;

  constructor() {
    const session = localStorage.getItem(this.KEY);
    this.isAuthenticated = session === 'true';
  }

  login(email: string, password: string): boolean {
    // Lógica de autenticación simple (puedes conectarlo a una API real)
    if (email === 'test@test.com' && password === '1234') {
      this.isAuthenticated = true;
      localStorage.setItem(this.KEY, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem(this.KEY);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
