import { MoviesService } from './movies.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('Movies Service', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  const expectedResponse = [
    {
      id: 1,
      title: 'Movie 1',
      description: 'Desc 1'
    },
    {
      id: 2,
      title: 'Movie 2',
      description: 'Desc 2'
    },
    {
      id: 3,
      title: 'Movie 3',
      description: 'Desc 3'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getMovies$() should return data', () => {
    service.getMovies$().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(response.length).toEqual(expectedResponse.length);
    });

    const req = httpMock.expectOne('http://localhost:3000/movies');
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('getMovie$() should return single item if id exists in the list', () => {
    const expectedMovie = expectedResponse[0];

    service.getMovie$(expectedMovie.id).subscribe((response) => {
      expect(response.id).toEqual(expectedMovie.id);
      expect(response.title).toEqual(expectedMovie.title);
    });

    const req = httpMock.expectOne(`http://localhost:3000/movies/${expectedMovie.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedMovie);
  });

  it('getMovie$() should return undefined if id does not exist', () => {
    service.getMovie$(10).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:3000/movies/10');
    expect(req.request.method).toBe('GET');
  });

  it('delete$() should send DELETE', () => {
    service.delete$(1).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/movies/1');
    expect(req.request.method).toBe('DELETE');
  });

  it('save$() should send POST request if id is not defined', () => {
    const movieToAdd = {
      id: null,
      title: 'Movie to add'
    };

    service.save$(movieToAdd).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/movies');
    expect(req.request.method).toBe('POST');
  });

  it('save$() should send PUT request if id is defined', () => {
    const movieToUpdate = {
      id: 1,
      title: 'Movie to update'
    };

    service.save$(movieToUpdate).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/movies/1');
    expect(req.request.method).toBe('PUT');
  });
});
