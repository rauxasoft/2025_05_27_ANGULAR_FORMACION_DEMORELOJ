import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CronoEngineService } from './crono-engine.service';

describe('CronoEngineService', () => {
  let service: CronoEngineService;

  beforeEach(() => {
    service = new CronoEngineService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // test 1
  it('Tras invocar start() debe pasar a RUNNING y empezar a contar', fakeAsync(() => {
    service.start();
    expect(service.estado()).toBe('RUNNING');
    expect(service.totalSegundos()).toBe(0);
    tick(500); // avanza medio segundo
    expect(service.totalSegundos()).toBe(1);
    tick(1000);
    expect(service.totalSegundos()).toBe(3);
  }));

  // test 2
  it('Tras invocar pause() el cronometro entra en estado "paused" y se detiene', fakeAsync(() => {
    service.start();
    tick(1000);
    service.pause();
    const tiempoTrasPausa = service.totalSegundos();
    tick(1000);
    expect(service.estado()).toBe('PAUSED');
    expect(service.totalSegundos()).toBe(tiempoTrasPausa);
  }));

  // test 3
  it('Debe reaunudar el cronómetro desde donde se pausó', fakeAsync(() => {
    
    service.start();
    tick(1000); // Cuenta hasta 2
    
    service.pause();
    const tiempoAntesDeReaunudar = service.totalSegundos();
    tick(1000);
    expect(service.totalSegundos()).toBe(tiempoAntesDeReaunudar);

    service.resume();
    tick(1000); // debería contar 2 ticks más
    expect(service.estado()).toBe('RUNNING');
    expect(service.totalSegundos()).toBe(tiempoAntesDeReaunudar + 2);

  }));

  // test 4
  it('El método reset() debe detener el cronómetro, reinicar el contador y establecer dirección a UP', fakeAsync(() => {
    service.start();
    tick(1000);
    service.down();
    service.pause();
    service.reset();
    expect(service.estado()).toBe('STOPPED');
    expect(service.totalSegundos()).toBe(0);
    expect(service.sentido()).toBe('UP');
  }));

  // test 5
  it('Al contar hacia atrás y llegar 0 segundos se debe resetear automáticamente', fakeAsync(() => {
    service.start();
    tick(5000);
    service.down();
    tick(6000);
    service.reset();
    expect(service.estado()).toBe('STOPPED');
    expect(service.totalSegundos()).toBe(0);
    expect(service.sentido()).toBe('UP');
  }));

  // test 6
  it('Debe cambiar la dirección de bajada a subida durante la ejecución sin detenerse', fakeAsync(() => {
    
    service.start();
    tick(5000);
    
    service.down();
    tick(1000);
    tick(500);
    tick(500); // lo tenemos reseteado
    
    service.up();
    tick(500);
    tick(700);

    expect(service.sentido()).toBe('UP');
    expect(service.estado()).toBe('RUNNING');
    expect(service.totalSegundos()).toBe(8);

  }));

  // test 7
  it('Debe conservar el tiempo acumulado entre pause() y resume()', fakeAsync(() => {
    
    service.start();
    tick(1000);
    const tiempoAntesDePausa = service.totalSegundos();
    service.pause();

    tick(1000); // no debe aumentar
    expect(service.totalSegundos()).toBe(tiempoAntesDePausa);

    service.resume();
    tick(1000);
    expect(service.totalSegundos()).toBe(tiempoAntesDePausa + 2);

  }));

  // test 8
  it('Cambia de dirección de UP a DOWN durante la ejecución, sin detenerse', fakeAsync(() => {
    
    service.start();
    tick(2000);
    expect(service.totalSegundos()).toBe(4);
    expect(service.sentido()).toBe('UP');

    service.down();
    tick(1000);
    expect(service.totalSegundos()).toBe(2);
    expect(service.sentido()).toBe('DOWN');

  }));

  // test 9
  it('El método reset() también funciona estando en "PAUSED"', fakeAsync(() => {
    
    service.start();
    tick(1000);

    service.pause();
    expect(service.estado()).toBe("PAUSED");
    
    service.reset();

    expect(service.totalSegundos()).toBe(0);
    expect(service.estado()).toBe("STOPPED");
    expect(service.sentido()).toBe('UP');
  }));

});
