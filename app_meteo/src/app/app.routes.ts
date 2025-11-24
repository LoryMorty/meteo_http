import { Routes } from '@angular/router';
import { MeteoAttuale } from './meteo-attuale/meteo-attuale';
import { FiveDays } from './five-days/five-days';

export const routes: Routes = [
//se l’URL è vuoto, vai su /pagina1
{ path: '', redirectTo: 'meteo_attuale', pathMatch: 'full' },
//se l'URL è /pagina1 mostra il componente Pagina1

//quale componente risponde a ogni rotta
{ path: 'meteo_attuale', component: MeteoAttuale },
{ path: 'five_days', component: FiveDays },
]
