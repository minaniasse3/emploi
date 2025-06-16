import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navigation -->
      <nav class="bg-white shadow-lg">
        <div class="container mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex">
              <!-- Logo -->
              <div class="flex-shrink-0 flex items-center">
                <a routerLink="/" class="text-2xl font-bold text-blue-600">JobBoard</a>
              </div>

              <!-- Navigation Links -->
              <div class="hidden md:ml-6 md:flex md:space-x-8">
                <a routerLink="/offres" 
                   routerLinkActive="border-b-2 border-blue-500"
                   class="inline-flex items-center px-1 pt-1 text-gray-700 hover:text-gray-900">
                  Offres d'emploi
                </a>
                <a routerLink="/recruteurs" 
                   routerLinkActive="border-b-2 border-blue-500"
                   class="inline-flex items-center px-1 pt-1 text-gray-700 hover:text-gray-900">
                  Recruteurs
                </a>
              </div>
            </div>

            <!-- Right side buttons -->
            <div class="flex items-center">
              <a routerLink="/offres/ajouter" 
                 class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Publier une offre
              </a>
              <a routerLink="/recruteurs/ajouter" 
                 class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200">
                Ajouter un recruteur
              </a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="bg-white border-t mt-auto">
        <div class="container mx-auto px-4 py-6">
          <p class="text-center text-gray-600">© 2024 JobBoard. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  `
})
export class AppComponent {
  title = 'JobBoard';
}
