import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearareaComponent } from './creararea.component';

describe('CrearareaComponent', () => {
  let component: CrearareaComponent;
  let fixture: ComponentFixture<CrearareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
