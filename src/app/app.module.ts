import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MovieFormComponent } from './movies/movie-form/movie-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'movies/add',
    component: MovieFormComponent
  },
  {
    path: 'movies/edit/:id',
    component: MovieFormComponent
  },
  {
    path: '',
    component: MoviesListComponent
  }
];

@NgModule({
  declarations: [
    MoviesListComponent,
    AppComponent,
    MovieItemComponent,
    MovieFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
