// Import base di Angular per definire un componente
import { Component } from '@angular/core';
// Import per usare ngModel nei template
import { FormsModule } from '@angular/forms';
// Import di direttive comuni come *ngIf, *ngFor
import { CommonModule } from '@angular/common';
// Import del service che si occupa di chiamare l'API meteo
import { MeteoService } from '../services/meteo-service';

@Component({
  // Nome del selettore HTML del componente (<app-meteo-attuale>)
  selector: 'app-meteo-attuale',
  // Componente standalone (non ha bisogno di un modulo)
  standalone: true,
  // Moduli che questo componente può usare nel template
  imports: [FormsModule, CommonModule],
  // Template HTML associato
  templateUrl: './meteo-attuale.html',
  // File CSS associato
  styleUrl: './meteo-attuale.css',
})
export class MeteoAttuale {
  // Città inserita dall'utente
  city = '';
  // Oggetto che conterrà i dati restituiti dall'API
  dati: any = null;
  // Indica se è in corso una chiamata HTTP
  loading = false;
  // Eventuale messaggio di errore da mostrare all'utente
  errorMsg = '';

  // Il service viene iniettato nel costruttore
  constructor(private meteoService: MeteoService) {}

  // Funzione chiamata quando l'utente preme il bottone "Cerca"
  caricaMeteo() {
    // Se la città è vuota (o solo spazi), esco e non faccio chiamate
    if (!this.city.trim()) return;

    // Imposto lo stato di caricamento e pulisco errori/dati precedenti
    this.loading = true;
    this.errorMsg = '';
    this.dati = null;

    // Chiamo il metodo del service che ritorna un Observable
    this.meteoService.getCurrentWeather(this.city).subscribe({
      // next viene chiamato quando la risposta arriva correttamente
      next: (risposta) => {
        // Salvo la risposta JSON nella proprietà dati
        this.dati = risposta;
        // Disabilito lo stato di caricamento
        this.loading = false;
      },
      // error viene chiamato se la richiesta HTTP fallisce
      error: (err) => {
        // Stampo l'errore in console per debug
        console.error(err);
        // Messaggio di errore per l'utente
        this.errorMsg = 'Non sono riuscito a trovare il meteo per questa città.';
        // Disabilito lo stato di caricamento
        this.loading = false;
      }
    });
  }
}
