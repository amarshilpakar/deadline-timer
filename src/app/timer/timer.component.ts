import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TimerService } from './timer.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-timer',
  imports: [CommonModule],
  providers: [TimerService],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {
  public secondsLeft$: Observable<number> = of(0);
  constructor(private readonly timerService: TimerService) {}

  ngOnInit(): void {
    this.secondsLeft$ = this.timerService.getDeadline();
  }
}
