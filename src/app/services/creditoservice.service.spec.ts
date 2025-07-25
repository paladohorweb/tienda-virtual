import { TestBed } from '@angular/core/testing';

import { CreditoserviceService } from './credito.service';

describe('CreditoserviceService', () => {
  let service: CreditoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
