import { Component, inject } from '@angular/core';
import { FileService } from '../../core/services/file.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, catchError, EMPTY, filter, finalize, switchMap, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './upload.html',
  styleUrl: './upload.scss',
})
export class UploadComponent {

  private fileService = inject(FileService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  selected?: File;

  private selectedSubject = new BehaviorSubject<File | null>(null);
  selected$ = this.selectedSubject.asObservable();

  private loadingSubject = new BehaviorSubject(false);
  loading$ = this.loadingSubject.asObservable();

  onFile(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0] ?? null;
    this.selectedSubject.next(file);
  }

  upload() {

    this.selected$
      .pipe(
        take(1),
        filter(Boolean),

        tap(() => this.loadingSubject.next(true)),

        switchMap(file =>
          this.fileService.upload(file!)
        ),

        finalize(() =>
          this.loadingSubject.next(false)
        ),

        catchError(err => {

          const msg =
            err?.error?.message ||
            'Upload failed';

          this.snack.open(msg, 'Close', {
            duration: 4000
          });

          return EMPTY;
        })
      )
      .subscribe(meta => {

        this.snack.open(
          'File uploaded successfully',
          '',
          { duration: 2500 }
        );

        this.router.navigate(
          ['/preview', meta.fileId]
        );
      });
  }

  goBack() {
    this.router.navigate(['']);
  }

}
