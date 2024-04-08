import { TestBed } from '@angular/core/testing';

import { MatiereServService } from './matiere-serv.service';

describe('MatiereServService', () => {
  let service: MatiereServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatiereServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
