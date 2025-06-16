import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mx-auto px-4 py-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Job Board</h1>
        <nav class="mt-4">
          <ul class="flex space-x-4">
            <li>
              <a routerLink="/offres" 
                 class="text-blue-600 hover:text-blue-800">
                Liste des offres
              </a>
            </li>
            <li>
              <a routerLink="/recruteurs" 
                 class="text-blue-600 hover:text-blue-800">
                Liste des recruteurs
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f9fafb;
    }
  `]
})
export class AppComponent {
  title = 'Job Board';
}
