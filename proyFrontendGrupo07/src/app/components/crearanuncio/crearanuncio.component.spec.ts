import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearanuncioComponent } from './crearanuncio.component';

describe('CrearanuncioComponent', () => {
  let component: CrearanuncioComponent;
  let fixture: ComponentFixture<CrearanuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearanuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearanuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
