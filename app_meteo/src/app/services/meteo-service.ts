// HttpClient serve per effettuare richieste HTTP (GET, POST, ecc.)
import { HttpClient } from '@angular/common/http';
// Injectable permette di usare il service con dependency injection
import { Injectable } from '@angular/core';
// Observable rappresenta il risultato asincrono di una chiamata HTTP
import { Observable } from 'rxjs';
// File che contiene la API key, NON versionato su GitHub
import { environmentSecret } from '../../environment.secret';

@Injectable({
  // providedIn: 'root' rende il service disponibile in tutta l'app senza doverlo registrare in un modulo
  providedIn: 'root',
})
export class MeteoService {
  // Metodo non usato, presente solo perché generato automaticamente
  getRandomFact() {
    throw new Error('Method not implemented.');
  }

  // Leggo la chiave API da un file separato (non incluso nella repository)
  private apiKey = environmentSecret.openWeatherKey;

  // URL base delle API di OpenWeather
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  // Angular inietta un'istanza di HttpClient in questo service
  constructor(private http: HttpClient) {}

  // ---------------------------
  // METEO ATTUALE
  // ---------------------------
  // Questo metodo chiama l'endpoint /weather e restituisce un Observable con i dati del meteo attuale
  getCurrentWeather(city: string): Observable<any> {
    // Costruisco la URL con:
    // - q: nome della città
    // - appid: chiave API
    // - units=metric: gradi Celsius
    // - lang=it: lingua italiana per la descrizione
    const url = `${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=it`;
    // Faccio una richiesta HTTP GET e ritorno l'Observable
    return this.http.get(url);
  }

  // ---------------------------
  // PREVISIONI 5 GIORNI / 3 ORE
  // ---------------------------
  // Questo metodo chiama l'endpoint /forecast
  getForecast(city: string): Observable<any> {
    // URL per ottenere le previsioni ogni 3 ore per 5 giorni
    const url = `${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=it`;
    // Restituisco l'Observable della richiesta GET
    return this.http.get(url);
  }
}
