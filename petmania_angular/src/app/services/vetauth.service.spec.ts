import { TestBed } from '@angular/core/testing';

import { VetauthService } from './vetauth.service';

describe('VetauthService', () => {
  let service: VetauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VetauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
