import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from './pages/loading/LoadingService';
import { LoadingComponent } from './pages/loading/loading.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', hideRequiredMarker: true },
    },
  ],
})
export class AppComponent implements OnInit {
  title = 'SmartBrainsWeb';

  constructor(private router: Router, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        const url = this.router.url;

        const rotasComDelay = ['/dashboard'];

        if (rotasComDelay.includes(url)) {
          setTimeout(() => this.loadingService.hide(), 1000);
        } else {
          this.loadingService.hide();
        }
      }
    });
  }
}
