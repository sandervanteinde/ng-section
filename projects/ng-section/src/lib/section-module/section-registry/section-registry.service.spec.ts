import { TestBed } from '@angular/core/testing';

import { SectionRegistryService } from './section-registry.service';

describe('SectionRegistryService', () => {
  let service: SectionRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
