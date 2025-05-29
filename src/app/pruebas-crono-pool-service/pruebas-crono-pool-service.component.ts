import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { CronoPoolService } from '../cronometro/services/crono-pool.service';

@Component({
  selector: 'app-pruebas-crono-pool-service',
  imports: [],
  templateUrl: './pruebas-crono-pool-service.component.html',
  styleUrl: './pruebas-crono-pool-service.component.css'
})
export class PruebasCronoPoolServiceComponent {
  
  cronoPoolService = inject(CronoPoolService);
  
  poolEntries = computed(() => [...this.cronoPoolService.poolSignal().entries()]);

  constructor(){
    effect(() => {
      for (const [id, instancia] of this.poolEntries()){
        console.log('ID: ' , id, 'Instancia: ', instancia.estado());
      }
    });
  }

  addCrono(): void {
    const id = this.cronoPoolService.create();
    console.log("creado el crono " + id);
  }

}
