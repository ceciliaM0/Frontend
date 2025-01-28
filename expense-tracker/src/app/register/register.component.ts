import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      const error = await this.authService.register(this.email, this.password);
      if (error) {
        this.errorMessage = error;
      } else {
        this.router.navigate(['/budget']);
      }
    } catch (error) {
      this.errorMessage = 'A apărut o eroare la înregistrare. Încearcă din nou!';
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
