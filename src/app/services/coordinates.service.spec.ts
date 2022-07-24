import { TestBed } from '@angular/core/testing';

import { CoordinatesService } from './coordinates.service';

describe('CoordinatesService', () => {
  let service: CoordinatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoordinatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
