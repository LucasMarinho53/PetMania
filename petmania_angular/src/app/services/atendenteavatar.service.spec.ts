import { TestBed } from '@angular/core/testing';

import { AtendenteavatarService } from './atendenteavatar.service';

describe('AtendenteavatarService', () => {
  let service: AtendenteavatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtendenteavatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
