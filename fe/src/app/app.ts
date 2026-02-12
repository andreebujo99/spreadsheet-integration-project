import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('fe');

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  breadcrumb$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map(() => {
      const root = this.route.root;
      const crumbs: any[] = [];

      let current = root;
      let url = '';

      while (current.firstChild) {
        current = current.firstChild;

        if (current.snapshot.url.length) {
          url += `/${current.snapshot.url.map(s => s.path).join('/')}`;
          const label = current.snapshot.data['breadcrumb'];

          if (label) {
            crumbs.push({ label, url });
          }
        }
      }

      return crumbs;
    })
  );

}
