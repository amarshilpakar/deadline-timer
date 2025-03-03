import { TestBed } from '@angular/core/testing';

import { TimerService } from './timer.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('TimerService', () => {
  let service: TimerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimerService,
        provideHttpClient(),
        provideHttpClientTesting()  
      ]
    });
    service = TestBed.inject(TimerService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should call the deadline api', () => {
    const deadlineResponse = { secondsLeft: 10 };
    service.getDeadline().subscribe();;
    const req = httpMock.expectOne(`${service.apiBaseURL}/api/deadline`);
    req.flush(deadlineResponse);
    expect(req.request.method).toBe('GET');

  })
});
