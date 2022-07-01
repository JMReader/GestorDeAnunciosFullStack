import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearrolComponent } from './crearrol.component';

describe('CrearrolComponent', () => {
  let component: CrearrolComponent;
  let fixture: ComponentFixture<CrearrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearrolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
