import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieItemComponent } from './movie-item.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let fixture: ComponentFixture<MovieItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MovieItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;

    component.movie = {
      id: 1,
      title: 'mock movie title',
      description: 'mock movie description'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit with value', () => {
    const spy = spyOn(component.clicked, 'emit');

    // act
    component.onClick();

    // assert
    expect(spy).toHaveBeenCalledWith(component.movie);
  });

  it('should emit delete event with movie id', () => {
    const spy = spyOn(component.deleted, 'emit');

    component.onDelete();

    expect(spy).toHaveBeenCalledWith(1);
    expect(spy).toHaveBeenCalledWith(component.movie.id);
  });
});
