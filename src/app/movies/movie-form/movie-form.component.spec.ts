import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFormComponent } from './movie-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from '../../services/movies.service';

describe('MovieFormComponent', () => {
  let component: MovieFormComponent;
  let fixture: ComponentFixture<MovieFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ MovieFormComponent ],
      providers: [MoviesService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form with validators', () => {
    // act
    component.ngOnInit();

    // assert
    expect(component.formGroup).not.toBe(undefined);
    expect(Object.keys(component.formGroup.controls).length).toBe(3);
    expect(component.formGroup.get('title').invalid).toBe(true);
    expect(component.formGroup.get('title').invalid).toBeTrue();
  });

  it('should have form and title field is valid', () => {
    // arrange
    component.ngOnInit();
    expect(component.formGroup.get('title').valid).toBeFalse();

    // act
    component.formGroup.get('title').setValue('test');

    // assert
    expect(component.formGroup.get('title').valid).toBeTrue();
  });

  it('should have valid form group', () => {
    // arrange
    component.ngOnInit();
    expect(component.formGroup.valid).toBeFalse();

    // act
    component.formGroup.setValue({
      id: null,
      title: 'test title',
      description: 'test desc'
    });

    // assert
    expect(component.formGroup.valid).toBeTrue();
  });
});
