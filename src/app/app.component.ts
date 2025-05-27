import { Component, effect, inject } from '@angular/core';
import { CronoConsoleComponent } from './cronometro/crono-console-component/crono-console.component';
import { CronoEngineService } from './cronometro/services/crono-engine.service';

@Component({
  selector: 'app-root',
  imports: [CronoConsoleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  cronoEngine = inject(CronoEngineService);

  constructor(){
    effect(() => console.log(this.cronoEngine.estado()));  
  }

}
/*

Consideraciones

1.- El motor como Service es singleton. Todos los componentes estarán manipulando el mismo motor.
2.- Si queremos que se puedan crear motores diferentes se tiene que definir como clase y ser instanciados.
    El problema que tenemos aquí es la dificultad para compartir el motor en diferentes sitios.
3.- Otro problema que se plantea es: 

      - Diseñar un componente que sea el único que pueda manipular el reloj.
      - Desde otros componentes sólo se accedería a las propiedades de lectura.

4.- Otra idea interesante es que haya un servicio que gestione diferentes motores.
    - se podrá crear un motor y darle un nombre (y darle una velocidad)
    - se podrá listar todos los motores existentes
    - se podrá eliminar un motor
    - se podrá obtener un motor a partir de su nombre

5.- Extras:
    - colocar alarmas en los motores
    - colocar un tiempo para que se detenga al alcanzarlo
*/
