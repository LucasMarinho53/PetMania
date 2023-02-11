import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFichaComponent } from './lista-ficha.component';

describe('ListaFichaComponent', () => {
  let component: ListaFichaComponent;
  let fixture: ComponentFixture<ListaFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFichaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
