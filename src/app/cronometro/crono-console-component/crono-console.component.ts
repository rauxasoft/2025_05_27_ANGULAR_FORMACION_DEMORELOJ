import { Component, inject, input, InputSignal, Signal } from '@angular/core';
import { CronoEngineService } from '../services/crono-engine.service';
import { CronoConsoleConfig } from './crono-console-config';

@Component({
  selector: 'app-crono-console',
  templateUrl: './crono-console.component.html',
  styleUrl: './crono-console.component.css'
  
})
export class CronoConsoleComponent {
  
  cronoEngine = inject(CronoEngineService);
  cronoConsoleConfig: InputSignal<CronoConsoleConfig | undefined> = input<CronoConsoleConfig>();

  get config(): Required<CronoConsoleConfig> {

    const base = this.cronoConsoleConfig() ?? {};

    return {
      mostrarEstado: base.mostrarEstado ?? true,
      mostrarSentido: base.mostrarSentido ?? true,
      mostrarBotones: base.mostrarBotones ?? true,
      formatoTiempo: base.formatoTiempo ?? 'segundos',
      botones :{
        start: 'Start',
        pause: 'Pause',
        resume: 'Resume',
        up: 'Up',
        down: 'Down',
        reset: 'Reset',
        ...(this.cronoConsoleConfig()?.botones ?? {})
      }
    }
  }

  getDisplay(){
    const totalSegundos = this.cronoEngine?.totalSegundos() ?? 0;
    const horas = ("0" + Math.floor(totalSegundos / 3600)).slice(-2);
    const minutos = ("0" + Math.floor(totalSegundos / 60 % 60)).slice(-2);
    const segundos = ("0" + Math.floor(totalSegundos % 60)).slice(-2);
    return `${horas}:${minutos}:${segundos}`;
  }
}
