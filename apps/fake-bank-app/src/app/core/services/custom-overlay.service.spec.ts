import { TestBed } from '@angular/core/testing';

import { CustomOverlayService } from './custom-overlay.service';

describe('CustomOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomOverlayService = TestBed.get(CustomOverlayService);
    expect(service).toBeTruthy();
  });
});
