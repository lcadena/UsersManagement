import { TestBed } from '@angular/core/testing';

import { UserinfoService } from './userinfo.service';

describe('UserinfodetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserinfoService = TestBed.get(UserinfoService);
    expect(service).toBeTruthy();
  });
});
