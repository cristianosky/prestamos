import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}

  async login(email: string, password: string): Promise<boolean> {
    try {
      await setPersistence(this.auth, browserLocalPersistence); // <-- Aquí se aplica la persistencia
      await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (error) {
      console.error('Error de login:', error);
      return false;
    }
  }

  logout() {
    return this.auth.signOut();
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}
