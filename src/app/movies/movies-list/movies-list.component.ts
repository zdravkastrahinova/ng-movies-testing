import { Component } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {

  movies = [
    {
      id: 1,
      title: 'Hello',
      description: 'Lorem impsun'
    },
    {
      id: 2,
      title: 'Bye'
    },
    {
      id: 3,
      title: 'Test'
    }
  ];

  selectedMovie: Movie;

  onItemClicked(movie: Movie): void {
    this.selectedMovie = movie;
  }
}
