import { Component, inject } from '@angular/core';
import { FileService } from '../../core/services/file.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { catchError, map, of, shareReplay, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    RouterLink,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './files.html',
  styleUrl: './files.scss',
})
export class FilesComponent {

  private service = inject(FileService);
  private snack = inject(MatSnackBar);

  loading = true;

  files$ = this.service.list({}).pipe(
    map(res => res.files),
    tap(() => this.loading = false),
    catchError(err => {
      console.error(err);
      this.loading = false;

      this.snack.open(
        'Error loading files',
        'Close',
        { duration: 3000 }
      );

      return of([]);
    }),
    shareReplay(1)
  );


}
