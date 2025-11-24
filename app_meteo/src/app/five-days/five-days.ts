// Import base di Angular per creare un componente
import { Component } from '@angular/core';
// Import per usare [(ngModel)] nel template
import { FormsModule } from '@angular/forms';
// Import per direttive come *ngIf, *ngFor
import { CommonModule } from '@angular/common';
// Import del service che gestisce le chiamate HTTP al meteo
import { MeteoService } from '../services/meteo-service';

@Component({
  // Nome del selettore HTML del componente (<app-five-days>)
  selector: 'app-five-days',
  // Indico che questo componente è standalone (non viene dichiarato in un modulo)
  standalone: true,
  // Moduli che questo componente può usare nel template
  imports: [FormsModule, CommonModule],
  // File HTML associato a questo componente
  templateUrl: './five-days.html',
  // File CSS associato a questo componente
  styleUrl: './five-days.css',
})
export class FiveDays {
  // Città inserita dall'utente tramite input
  city = '';    
  // Qui salvo la risposta dell'API (JSON con le previsioni)
  dati: any;
  // Indica se la chiamata HTTP è in corso
  loading = false;
  // Eventuale messaggio di errore da mostrare all'utente
  errorMsg = '';

  // Inietto il MeteoService per poter chiamare le API
  constructor(private meteo: MeteoService) {}

  // Metodo che Angular chiama automaticamente quando il componente viene inizializzato
  ngOnInit() {
    // All'avvio provo a caricare le previsioni (se city è vuota, la funzione esce subito)
    this.caricaPrevisioni();
  }

  // Metodo che si occupa di chiamare l'API delle previsioni a 5 giorni
  caricaPrevisioni() {
    // Se l'utente non ha inserito una città (stringa vuota o solo spazi), non faccio nulla
    if (!this.city.trim()) return;

    // Imposto lo stato "sto caricando" e pulisco eventuali errori o dati precedenti
    this.loading = true;
    this.errorMsg = '';
    this.dati = null;

    // Chiamo il metodo del service che ritorna un Observable
    this.meteo.getForecast(this.city).subscribe({
      // next viene eseguito quando la chiamata va a buon fine e arrivano i dati
      next: (risposta) => {
        // Salvo la risposta (oggetto JSON) nella variabile dati
        this.dati = risposta;
        // Disattivo lo stato di caricamento
        this.loading = false;
      },
      // error viene eseguito se la chiamata HTTP fallisce (es. città sbagliata, rete, ecc.)
      error: (err) => {
        // Stampo l'errore in console per debugging
        console.error(err);
        // Mostro un messaggio comprensibile all'utente
        this.errorMsg = 'Non sono riuscito a trovare le previsioni per questa città.';
        // Disattivo lo stato di caricamento
        this.loading = false;
      }
    });
  }
}
