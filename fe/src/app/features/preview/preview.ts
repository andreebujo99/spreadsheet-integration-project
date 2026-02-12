import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, tap, switchMap, map, finalize, catchError, EMPTY } from "rxjs";
import { FileService } from "../../core/services/file.service";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from "@angular/material/icon";

type Column = {
  name: string;
  type: 'string' | 'number' | 'date';
};

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatIcon
],
  templateUrl: './preview.html',
  styleUrl: './preview.scss',
})
export class PreviewComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(FileService);
  private snack = inject(MatSnackBar);

  private columnsSubject = new BehaviorSubject<Column[]>([]);
  private loadingSubject = new BehaviorSubject(true);
  private savingSubject = new BehaviorSubject(false);

  columns$ = this.columnsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  saving$ = this.savingSubject.asObservable();

  rows$ = this.route.paramMap.pipe(
    tap(() => this.loadingSubject.next(true)),
    switchMap(params =>
      this.service.getById(params.get('id')!)
    ),
    tap(file => {
      this.columnsSubject.next(file.columns);
      this.loadingSubject.next(false);
    }),
    map(file => file.preview || [])
  );

  displayed$ = this.columns$.pipe(
    map(cols => cols.map(c => c.name))
  );

  setType(name: string, type: Column['type']) {
    const updated = this.columnsSubject.value.map(c =>
      c.name === name ? { ...c, type } : c
    );
    this.columnsSubject.next(updated);
  }

  save() {

    const id = this.route.snapshot.paramMap.get('id')!;

    this.savingSubject.next(true);

    this.service
      .saveColumnTypes(id, this.columnsSubject.value)
      .pipe(
        finalize(() => this.savingSubject.next(false)),
        catchError(err => {

          this.snack.open(
            err?.error?.message || 'Save failed',
            'Close',
            { duration: 4000 }
          );

          return EMPTY;
        })
      )
      .subscribe(() =>
        this.snack.open(
          'Column types saved',
          '',
          { duration: 2500 }
        )
      );
  }

  goBack() {
    this.router.navigate(['']);
  }
}
