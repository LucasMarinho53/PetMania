import { TestBed } from '@angular/core/testing';

import { AtendenteauthService } from './atendenteauth.service';

describe('AtendenteauthService', () => {
  let service: AtendenteauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtendenteauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
