import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  information = null;
  KEY = 'favorites';
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.movieService.getDetails(id).subscribe((result) => {
      this.information = result;
    });
  }
  openWebsite() {
    window.open(this.information.Website, '_blank');
  }
  async onClick(info: string) {
    var entry = { info: info };
    var libraryString = (await Storage.get({ key: this.KEY })).value;

    var library = JSON.parse(libraryString);
    if (library == null) {
      library = [];
    }

    if (libraryString == null) {
      libraryString = '';
    }

    if (!libraryString.includes(JSON.stringify(entry))) {
      library.unshift(entry);
      await Storage.set({ key: this.KEY, value: JSON.stringify(library) });
    }
    console.log(info);
  }
}
