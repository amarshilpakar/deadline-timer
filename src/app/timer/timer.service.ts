import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { interval, Observable, startWith, Subject, switchMap, takeUntil, takeWhile, tap } from 'rxjs';

export type Deadline = { 
  secondsLeft: number 
}

@Injectable()
export class TimerService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public readonly apiBaseURL = 'https://d0e5612f-4d97-4944-a045-e0ba8be2af0a.mock.pstmn.io';
  constructor(private readonly http: HttpClient) { }

  getDeadline(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseURL}/api/deadline`).pipe(
      switchMap(response => 
        interval(1000).pipe(
          startWith(0),
          takeUntil(this.destroy$),
          tap(() => response.secondsLeft--),
          switchMap(() => [response.secondsLeft]),
          takeWhile(secondsLeft => secondsLeft >= 0)
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
}
