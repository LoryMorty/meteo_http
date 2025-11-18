import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MeteoService } from '../services/meteo-service';

@Component({
  selector: 'app-five-days',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './five-days.html',
  styleUrl: './five-days.css',
})
export class FiveDays {
  city = '';    // città di default
  dati: any;          // dati previsioni
  loading = false;    // stato caricamento
  errorMsg = '';      // messaggio errore

  constructor(private meteo: MeteoService) {}

  ngOnInit() {
    this.caricaPrevisioni();
  }

  caricaPrevisioni() {
    if (!this.city.trim()) return;

    this.loading = true;
    this.errorMsg = '';
    this.dati = null;

    this.meteo.getForecast(this.city).subscribe({
      next: (risposta) => {
        this.dati = risposta;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Non sono riuscito a trovare le previsioni per questa città.';
        this.loading = false;
      }
    });
  }
}
