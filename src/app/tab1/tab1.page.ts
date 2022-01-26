import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService, SearchType } from 'src/app/services/movie.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  results: Observable<any>;
  searchTerm = '';
  type: SearchType = SearchType.all;
  constructor(private movieService: MovieService) {}

  ngOnInit() {}

  searchChanged() {
    this.results = this.movieService.searchData(this.searchTerm, this.type);
  }
}
