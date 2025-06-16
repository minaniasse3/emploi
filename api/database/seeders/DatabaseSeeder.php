<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recruteur;
use App\Models\Offre;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create test recruteurs
        $recruteur1 = Recruteur::create([
            'nom_entreprise' => 'Tech Solutions Inc.'
        ]);

        $recruteur2 = Recruteur::create([
            'nom_entreprise' => 'Digital Innovations SARL'
        ]);

        // Create test offres
        Offre::create([
            'titre' => 'Développeur Full Stack',
            'description' => 'Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe.',
            'type_contrat' => 'CDI',
            'localisation' => 'Paris',
            'salaire' => '45000€ - 55000€ par an',
            'recruteur_id' => $recruteur1->id,
            'competences_requises' => 'PHP, JavaScript, Angular, MySQL',
            'date_limite' => '2024-03-31',
            'statut' => 'Ouvert'
        ]);

        Offre::create([
            'titre' => 'UX/UI Designer',
            'description' => 'Poste de designer UX/UI pour nos projets web et mobile.',
            'type_contrat' => 'CDD',
            'localisation' => 'Lyon',
            'salaire' => '40000€ - 50000€ par an',
            'recruteur_id' => $recruteur2->id,
            'competences_requises' => 'Figma, Adobe XD, HTML/CSS',
            'date_limite' => '2024-03-15',
            'statut' => 'Ouvert'
        ]);

        Offre::create([
            'titre' => 'DevOps Engineer',
            'description' => 'Recherche DevOps pour gérer notre infrastructure cloud.',
            'type_contrat' => 'CDI',
            'localisation' => 'Remote',
            'salaire' => '50000€ - 65000€ par an',
            'recruteur_id' => $recruteur1->id,
            'competences_requises' => 'AWS, Docker, Kubernetes, CI/CD',
            'date_limite' => '2024-04-15',
            'statut' => 'Ouvert'
        ]);
    }
}
