import { TestBed } from '@angular/core/testing';

import { ClasseServService } from './classe-serv.service';

describe('ClasseServService', () => {
  let service: ClasseServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasseServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
