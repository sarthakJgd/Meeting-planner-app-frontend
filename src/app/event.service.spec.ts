import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { EventService } from './event.service';

describe('EventService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [EventService, provideHttpClient()] }));

  it('should be created', () => {
    const service: EventService = TestBed.inject(EventService);
    expect(service).toBeTruthy();
  });
});
