import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    this.loadThemePreference();
  }
   isDark = false;

  private loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    this.isDark = savedTheme === 'dark';
    document.body.classList.toggle('dark', this.isDark);
  }
}
