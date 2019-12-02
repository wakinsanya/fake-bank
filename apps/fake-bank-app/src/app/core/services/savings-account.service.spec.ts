import { TestBed } from '@angular/core/testing';

import { SavingsAccountService } from './savings-account.service';

describe('SavingsAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavingsAccountService = TestBed.get(SavingsAccountService);
    expect(service).toBeTruthy();
  });
});
