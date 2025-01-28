import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  async login(email: string, password: string): Promise<string | null> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/budget']);
      return null;
    } catch (error: any) {
      console.error('Login error:', error.message);
      return this.getErrorMessage(error.code, 'login');
    }
  }
  
  async register(email: string, password: string): Promise<string | null> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/budget']);
      return null;
    } catch (error: any) {
      console.error('Registration error:', error.message);
      return this.getErrorMessage(error.code, 'register');
    }
  }
  

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  getUser() {
    return this.auth;
  }

  private getErrorMessage(errorCode: string, context: 'login' | 'register'): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return context === 'login'
          ? 'Contul nu există. Verifică email-ul!'
          : 'Contul nu poate fi creat. Încearcă alt email!';
      case 'auth/wrong-password':
        return 'Parolă incorectă!';
      case 'auth/invalid-email':
        return 'Email invalid!';
      case 'auth/user-disabled':
        return 'Contul a fost dezactivat!';
      case 'auth/email-already-in-use':
        return 'Acest email este deja folosit!';
      case 'auth/weak-password':
        return 'Parola trebuie să aibă cel puțin 6 caractere!';
      default:
        return context === 'login'
          ? 'Eroare la autentificare. Încearcă din nou!'
          : 'Eroare la înregistrare. Încearcă din nou!';
    }
  }
  
}
