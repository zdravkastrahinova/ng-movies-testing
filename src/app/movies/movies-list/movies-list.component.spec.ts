import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesListComponent } from './movies-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from '../../services/movies.service';
import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-item',
  template: ''
})
export class MovieItemMockComponent {
  @Input() movie: Movie;
}

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [MoviesListComponent, MovieItemMockComponent],
      providers: [MoviesService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;

    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 2 movie-item components', () => {
    component.movies = [
      { title: 'm1' },
      { title: 'm2'}
    ];

    component.ngOnInit();
    fixture.detectChanges();

    const nodeList = fixture.nativeElement.querySelectorAll('app-movie-item');
    const elements = Array.from(nodeList);

    expect(elements.length).toBe(2);
    expect(elements.length).toBe(component.movies.length);
  });
});
