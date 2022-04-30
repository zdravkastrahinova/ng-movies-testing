import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  url = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {
  }

  getMovies$(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url);
  }

  getMovie$(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/${id}`);
  }

  post$(body: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.url, body);
  }

  put$(body: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.url}/${body.id}`, body);
  }

  delete$(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.url}/${id}`);
  }
}
