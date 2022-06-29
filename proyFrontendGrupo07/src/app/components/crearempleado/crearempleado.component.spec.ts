import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearempleadoComponent } from './crearempleado.component';

describe('CrearempleadoComponent', () => {
  let component: CrearempleadoComponent;
  let fixture: ComponentFixture<CrearempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearempleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
