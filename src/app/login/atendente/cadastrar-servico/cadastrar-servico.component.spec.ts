import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarServicoComponent } from './cadastrar-servico.component';

describe('CadastrarServicoComponent', () => {
  let component: CadastrarServicoComponent;
  let fixture: ComponentFixture<CadastrarServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarServicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
