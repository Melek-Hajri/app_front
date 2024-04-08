import { TestBed } from '@angular/core/testing';

import { SpecialiteServService } from './specialite-serv.service';

describe('SpecialiteServService', () => {
  let service: SpecialiteServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialiteServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
