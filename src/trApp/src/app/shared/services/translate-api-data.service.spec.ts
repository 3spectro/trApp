import { TestBed } from '@angular/core/testing';

import { TranslateApiDataService } from './translate-api-data.service';

describe('TranslateApiDataService', () => {
  let service: TranslateApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
