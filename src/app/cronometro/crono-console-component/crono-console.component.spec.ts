import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CronoConsoleComponent } from './crono-console.component';
import { By } from '@angular/platform-browser';
import { CronoEngineService } from '../services/crono-engine.service';


describe('CronoConsoleComponent', () => {
  let component: CronoConsoleComponent;
  let fixture: ComponentFixture<CronoConsoleComponent>;
  let service: CronoEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CronoConsoleComponent],
      providers: [CronoEngineService]
    });

    fixture = TestBed.createComponent(CronoConsoleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CronoEngineService);
    fixture.detectChanges();
  });

  it('debe mostrar el tiempo en pantalla al hacer start()', fakeAsync(() => {
    // Ejecutamos el cronómetro
    service.start();
    fixture.detectChanges();

    // Avanzamos el tiempo
    tick(1500);
    fixture.detectChanges();

    // Obtenemos el elemento del display usando el atributo data-testid
    const displayEl: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="crono-tiempo"]')
    ).nativeElement;

    expect(displayEl.textContent?.trim()).toBe('00:00:03');

    // Espera 30 segundos simulados
    tick(500 * 30);
    fixture.detectChanges();
    expect(displayEl.textContent).toContain('00:00:33');

    // Espera 30 segundos más (total: 60s)
    tick(500 * 30);
    fixture.detectChanges();
    expect(displayEl.textContent).toContain('00:01:03');

  }));
});