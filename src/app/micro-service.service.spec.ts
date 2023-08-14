import { TestBed } from '@angular/core/testing';

import { MicroServiceService } from './micro-service.service';

describe('MicroServiceService', () => {
  let service: MicroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
