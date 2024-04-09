import { TestBed } from '@angular/core/testing';

import { ModuleServService } from './module-serv.service';

describe('ModuleServService', () => {
  let service: ModuleServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
