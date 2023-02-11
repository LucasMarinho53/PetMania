import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnimalComponent } from './lista-animal.component';

describe('ListaAnimalComponent', () => {
  let component: ListaAnimalComponent;
  let fixture: ComponentFixture<ListaAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
