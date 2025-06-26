import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';
  isDark = false;

  constructor(private auth: AuthService, private router: Router) {
    this.isDark = localStorage.getItem('theme') === 'dark';
  }

  async login() {
    const success = await this.auth.login(this.email, this.password);
    
    if (success) {
      this.router.navigateByUrl('/home');
    } else {
      alert('Credenciales incorrectas');
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }
}
