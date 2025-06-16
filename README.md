# Job Board - Application de Gestion d'Offres d'Emploi

Cette application permet de gérer des offres d'emploi et des recruteurs. Elle est composée d'une API Laravel et d'une interface utilisateur Angular.

## Structure du Projet

```
job-board/
├── api/                 # Backend Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/  # Contrôleurs API
│   │   │   └── Requests/     # Validation des requêtes
│   │   ├── Models/          # Modèles Eloquent
│   │   └── Services/        # Logique métier
│   └── routes/
│       └── api.php         # Routes API
│
└── frontend/            # Frontend Angular
    └── src/
        └── app/
            ├── components/  # Composants Angular
            ├── models/     # Interfaces TypeScript
            └── services/   # Services Angular
```

## Fonctionnalités

### Backend (Laravel)

1. Gestion des recruteurs :
   - Création de recruteur
   - Liste des recruteurs
   - Liste des offres par recruteur

2. Gestion des offres :
   - Création d'offre
   - Liste des offres avec pagination
   - Recherche par type de contrat
   - Recherche par mot-clé

### Frontend (Angular)

1. Interface de gestion des recruteurs :
   - Liste des recruteurs avec leurs offres
   - Formulaire d'ajout de recruteur

2. Interface de gestion des offres :
   - Liste paginée des offres
   - Recherche d'offres
   - Formulaire d'ajout d'offre
   - Filtrage par type de contrat

## Installation

### Prérequis
- PHP >= 8.1
- Composer
- Node.js >= 14
- MySQL

### Backend (Laravel)

1. Naviguer vers le dossier api :
```bash
cd job-board/api
```

2. Installer les dépendances :
```bash
composer install
```

3. Configurer l'environnement :
```bash
cp .env.example .env
php artisan key:generate
```

4. Configurer la base de données dans .env :
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=job_board
DB_USERNAME=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
```

5. Migrer la base de données :
```bash
php artisan migrate
```

6. Lancer le serveur :
```bash
php artisan serve
```

### Frontend (Angular)

1. Naviguer vers le dossier frontend :
```bash
cd job-board/frontend
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer l'application :
```bash
ng serve
```

## Utilisation

1. Accéder à l'application :
   - Backend API : http://localhost:8000
   - Frontend : http://localhost:4200

2. Fonctionnalités disponibles :
   - Créer un recruteur
   - Ajouter des offres d'emploi
   - Consulter la liste des offres
   - Rechercher des offres
   - Voir les offres par recruteur

## Structure de la Base de Données

### Table `recruteurs`
- id (PK)
- nom_entreprise
- created_at
- updated_at

### Table `offres`
- id (PK)
- titre
- description
- type_contrat (CDI, CDD, Stage, Freelance)
- recruteur_id (FK)
- created_at
- updated_at

## API Endpoints

### Recruteurs
- GET /api/recruteurs - Liste des recruteurs
- POST /api/recruteurs - Créer un recruteur
- GET /api/recruteurs/{id}/offres - Offres d'un recruteur

### Offres
- GET /api/offres - Liste des offres
- POST /api/offres - Créer une offre
- GET /api/offres/search - Rechercher des offres
- GET /api/offres/type/{type} - Filtrer par type de contrat

## Technologies Utilisées

### Backend
- Laravel 10
- MySQL
- PHP 8.1

### Frontend
- Angular 16
- TypeScript
- Tailwind CSS
- RxJS

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Créer une Pull Request
