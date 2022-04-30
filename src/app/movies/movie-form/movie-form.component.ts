import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Movie } from '../../models/movie.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  movie: Movie;

  destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        const id = params.id;

        if (!id) {
          return null;
        }

        return this.moviesService.getMovie$(id);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.buildForm();
      }
    });

    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    let request$;
    if (this.formGroup.value.id) {
      request$ = this.moviesService.put$(this.formGroup.value);
    } else {
      request$ = this.moviesService.post$(this.formGroup.value);
    }

    request$.subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      id: this.movie?.id,
      title: [this.movie?.title, [Validators.required, Validators.minLength(3)]],
      description: [this.movie?.description, [Validators.maxLength(50)]]
    });
  }
}
