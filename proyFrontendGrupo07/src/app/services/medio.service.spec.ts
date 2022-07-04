import { TestBed } from '@angular/core/testing';

import { MedioService } from './medio.service';

describe('MedioService', () => {
  let service: MedioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
