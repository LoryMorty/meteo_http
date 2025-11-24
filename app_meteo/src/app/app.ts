import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MeteoAttuale } from './meteo-attuale/meteo-attuale';
import { FiveDays } from './five-days/five-days';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MeteoAttuale, FiveDays, RouterLink], // router outlet cambia automaticamente il contenuto a seconda della rotta selezionata
                                                               //router link serve per cambiare rotta
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app_meteo');
}
