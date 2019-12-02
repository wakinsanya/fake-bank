import { TestBed } from '@angular/core/testing';

import { CurrentAccountService } from './current-account.service';

describe('CurrentAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentAccountService = TestBed.get(CurrentAccountService);
    expect(service).toBeTruthy();
  });
});
