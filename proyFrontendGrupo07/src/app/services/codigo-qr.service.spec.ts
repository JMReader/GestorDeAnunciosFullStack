import { TestBed } from '@angular/core/testing';

import { CodigoQrService } from './codigo-qr.service';

describe('CodigoQrService', () => {
  let service: CodigoQrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodigoQrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
