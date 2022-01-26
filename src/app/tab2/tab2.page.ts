import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  KEY = 'favorites';
  myLibrary: Array<any> = [];
  constructor() {}
  async ionViewWillEnter() {
    this.loadLibrary();
  }
  private async loadLibrary() {
    const { value } = await Storage.get({
      key: this.KEY,
    });

    this.myLibrary = JSON.parse(value);
  }
}
