import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(public libraryService: LibraryService) {
    libraryService.loadLibrary();
  }
  ionViewWillEnter() {
    this.libraryService.loadLibrary();
  }
}
