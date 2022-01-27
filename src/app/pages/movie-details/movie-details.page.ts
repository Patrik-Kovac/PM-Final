import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  information = null;
  id = '';
  isFav = false;
  Fav: Promise<boolean>;
  icon = 'heart-outline';
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    public libraryService: LibraryService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.movieService.getDetails(this.id).subscribe((result) => {
      this.information = result;
    });
    this.libraryService.load(this.id);
    this.isFav = this.libraryService.mybool;
  }
  openWebsite() {
    window.open(this.information.Website, '_blank');
  }
  onClick(info) {
    this.isFav = !this.isFav;
    if (this.isFav == true) {
      this.libraryService.Clicked(info);
    } else {
      this.libraryService.removeItem(this.id);
    }
    this.changeIcon();
  }

  changeIcon() {
    if (this.isFav == true) {
      this.icon = 'heart';
    } else {
      this.icon = 'heart-outline';
    }
  }
}
