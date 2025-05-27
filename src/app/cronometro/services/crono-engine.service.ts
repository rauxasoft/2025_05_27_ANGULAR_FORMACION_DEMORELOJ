import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CronoEngineService {
  
  private intervalId: any = null;
  private _totalSeconds = signal(0);
  private _estado = signal<'STOPPED' | 'RUNNING' | 'PAUSED'>('STOPPED');
  private _sentido = signal<number>(1);
  
  // totalSegundos = computed(() => this._totalSeconds());
  // estado = computed(() => this._estado());
  // sentido = computed(() => this._sentido() === 1 ? 'UP' : 'DOWN');

  totalSegundos = this._totalSeconds.asReadonly();
  estado = this._estado.asReadonly();
  sentido = computed(() => this._sentido() === 1 ? 'UP' : 'DOWN');

  start() {
    clearInterval(this.intervalId);
    this._totalSeconds.set(0);
    this._sentido.set(1);
    this.resume();
  }

  pause() {
    clearInterval(this.intervalId);
    this._estado.set('PAUSED');
  }

  resume() {    
    clearInterval(this.intervalId);
    this._estado.set('RUNNING');
    this.intervalId = setInterval(() => {
      if (this._totalSeconds() === 0 && this._sentido() === -1) {
        this.reset();
      } else {
        this._totalSeconds.update(ts => ts + this._sentido());
      }
    }, 500);
  }
  
  reset() {
    clearInterval(this.intervalId);
    this._estado.set('STOPPED');
    this._sentido.set(1);
    this._totalSeconds.set(0);
  }

  up() {
    this._sentido.set(1);
  }

  down() {
    this._sentido.set(-1);
  }

}


// ✅ Opción 1: usar `computed()`
// ---------------------------------------------------
//
//        const totalSegundos = computed(() => this._totalSeconds());
//
// Esto crea una nueva signal derivada a partir de `this._totalSeconds()`.
// Se recalcula automáticamente cada vez que cambia `_totalSeconds`.
// Útil si más adelante necesitas transformar el valor o aplicar lógica adicional.

// Ventajas:
// - Reactiva y actualizable automáticamente.
// - Permite añadir lógica o transformaciones en el futuro.
//
// Desventajas:
// - Algo más costosa en rendimiento que asReadonly().
// - Puede ser redundante si no se necesita lógica adicional.


// ✅ Opción 2: usar `.asReadonly()`
// ---------------------------------------------------
//
//        const totalSegundos = this._totalSeconds.asReadonly();
//
// Esto simplemente expone la signal original `this._totalSeconds` de forma inmutable.
// No crea una nueva signal ni introduce lógica extra.
//
// Ideal para exponer signals privadas como públicas sin permitir modificación.

// Ventajas:
// - Más eficiente (no crea nueva signal).
// - Perfecto para exponer una signal sin permitir `set()` ni `update()`.
//
// Desventajas:
// - No permite lógica adicional.
// - Solo sirve para exponer directamente el valor original.


// 🧠 Recomendación general:
// - Usa `asReadonly()` si solo necesitas exponer la signal.
// - Usa `computed()` si necesitas derivar un valor o aplicar lógica reactiva.

