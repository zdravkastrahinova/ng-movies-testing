import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  movies: Movie[];
  selectedMovie: Movie;

  constructor(private moviesService: MoviesService) {
    this.movies = [];
  }

  ngOnInit(): void {
    this.moviesService.getMovies$().subscribe({
      next: (response: Movie[]) => {
        this.movies = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  onItemDeleted(id: number): void {
    this.moviesService.delete$(id).subscribe({
      next: () => {
        this.movies = this.movies.filter(movie => movie.id !== id);
      }
    });
  }

  onItemClicked(movie: Movie): void {
    this.selectedMovie = movie;
  }
}
