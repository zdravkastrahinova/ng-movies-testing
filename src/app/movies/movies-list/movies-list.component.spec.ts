import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesListComponent } from './movies-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from '../../services/movies.service';
import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-movie-item',
  template: ''
})
export class MovieItemMockComponent {
  @Input() movie: Movie;
}

export class MockMoviesService {
  movies = [
    { id: 1, title: 'm1' },
    { id: 2, title: 'm2' }
  ];

  getMovies$(): Observable<Movie[]> {
    return of([...this.movies]);
  }

  delete$(id: number): Observable<undefined> {
    this.movies = this.movies.filter(m => m.id !== id);

    return of(undefined);
  }
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
      declarations: [
        MoviesListComponent,
        MovieItemMockComponent
      ],
      providers: [
        {
          provide: MoviesService,
          useClass: MockMoviesService
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
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

  it('should have defined empty movies array when component is created', () => {
    expect(component.movies).toBeDefined();
    expect(component.movies).toHaveSize(0);
  });

  it('should have defined movies array with 2 items', () => {
    component.ngOnInit();

    expect(component.movies).toHaveSize(2);
  });

  it('should update movies array to contain only 1 item after onItemDelete is called', () => {
    component.ngOnInit();
    expect(component.movies).toHaveSize(2);

    const idToDelete = 1;
    component.onItemDeleted(idToDelete);

    expect(component.movies).toHaveSize(1);

    const movie = component.movies.find(m => m.id === idToDelete);
    expect(movie).toBeUndefined();
  });

  it('should set selected movie to be the same as the one that comes as a parameter', () => {
    expect(component.selectedMovie).toBeUndefined();

    const expectedMovie = {
      id: 1,
      title: 'Expected movie'
    };

    component.onItemClicked(expectedMovie);

    expect(component.selectedMovie).toBeDefined();
    expect(component.selectedMovie.id).toEqual(expectedMovie.id);
    expect(component.selectedMovie.title).toEqual(expectedMovie.title);
  });
});
