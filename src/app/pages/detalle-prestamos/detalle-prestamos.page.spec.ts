import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePrestamosPage } from './detalle-prestamos.page';

describe('DetallePrestamosPage', () => {
  let component: DetallePrestamosPage;
  let fixture: ComponentFixture<DetallePrestamosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePrestamosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
