import { Component, inject } from '@angular/core';
import { CronoEngineService } from '../services/crono-engine.service';

@Component({
  selector: 'app-crono-console',
  templateUrl: './crono-console.component.html',
  styleUrl: './crono-console.component.css'
  
})
export class CronoConsoleComponent {
  
  cronoEngine = inject(CronoEngineService);

  getDisplay(){
    const totalSegundos = this.cronoEngine?.totalSegundos() ?? 0;
    const horas = ("0" + Math.floor(totalSegundos / 3600)).slice(-2);
    const minutos = ("0" + Math.floor(totalSegundos / 60 % 60)).slice(-2);
    const segundos = ("0" + Math.floor(totalSegundos % 60)).slice(-2);
    return `${horas}:${minutos}:${segundos}`;
  }
}
