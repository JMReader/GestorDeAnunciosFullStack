import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizaranuncioComponent } from './autorizaranuncio.component';

describe('AutorizaranuncioComponent', () => {
  let component: AutorizaranuncioComponent;
  let fixture: ComponentFixture<AutorizaranuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizaranuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizaranuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
