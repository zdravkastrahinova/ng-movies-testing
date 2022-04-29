import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {

  @Input() movie: Movie;

  @Output() clicked = new EventEmitter<Movie>();

  onClick(): void {
    this.clicked.emit(this.movie);
  }
}
