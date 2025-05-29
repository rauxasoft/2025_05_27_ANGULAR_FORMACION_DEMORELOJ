import { Injectable, signal } from '@angular/core';
import { CronoEngineService } from './crono-engine.service';

@Injectable({
  providedIn: 'root'
})
export class CronoPoolService {

  private _pool = signal(new Map<number, CronoEngineService>());
  readonly poolSignal = this._pool.asReadonly();

  create(): number{
    let maxId = this._pool().size > 0 ? Math.max(...this._pool().keys()) : 0;
    ++maxId;
    const cronoEngineService = new CronoEngineService();
    const nuevoMapa = new Map(this._pool());
    nuevoMapa.set(maxId, cronoEngineService);
    this._pool.set(nuevoMapa);
    return maxId;
  }

  deleteById(id:number): boolean {
    const nuevoMapa = new Map(this._pool());
    const eliminado = nuevoMapa.delete(id);
    this._pool.set(nuevoMapa);
    return eliminado;
  }

  getCronometros(): CronoEngineService[]{
    return Array.from(this._pool().values());
  }

  getCronomtroById(id: number): CronoEngineService | undefined {
    return this._pool().get(id);
  }

  resetAll(){
    for (const cronoService of this._pool().values()){
      cronoService.reset();
    }
  }

  deleteAll(){
    this.resetAll();
    this._pool.set(new Map<number, CronoEngineService>());
  }
}
