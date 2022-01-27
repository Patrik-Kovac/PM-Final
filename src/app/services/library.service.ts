import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  KEY = 'favorites';
  str = '';
  myLibrary: Array<any> = [];
  mybool = false;

  constructor() {
    this.loadLibrary();
  }

  async Clicked(info: string) {
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

  async loadLibrary() {
    const { value } = await Storage.get({
      key: this.KEY,
    });

    this.myLibrary = JSON.parse(value);
  }
  async removeItem(id) {
    var index = this.myLibrary.findIndex(function (item) {
      return item.info.imdbID === id;
    });
    this.myLibrary.splice(index, 1);

    Storage.set({
      key: this.KEY,
      value: JSON.stringify(this.myLibrary),
    });
  }
  async load(id) {
    const { value } = await Storage.get({
      key: this.KEY,
    });
    if (value.includes(id)) {
      this.mybool = true;
    } else {
      this.mybool = false;
    }
    return this.mybool;
  }
}
