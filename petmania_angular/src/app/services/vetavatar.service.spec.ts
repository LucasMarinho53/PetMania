import { TestBed } from '@angular/core/testing';

import { VetavatarService } from './vetavatar.service';

describe('VetavatarService', () => {
  let service: VetavatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VetavatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
