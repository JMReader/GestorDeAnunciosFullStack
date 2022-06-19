import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaranunciosComponent } from './listaranuncios.component';

describe('ListaranunciosComponent', () => {
  let component: ListaranunciosComponent;
  let fixture: ComponentFixture<ListaranunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaranunciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaranunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
