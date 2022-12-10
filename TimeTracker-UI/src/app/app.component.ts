import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TimeTrackerApp';


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.authService.initiateRefresh();
  }

  ngOnDestroy(): void {
    // this.authService.terminateRefresh();
  }
}
