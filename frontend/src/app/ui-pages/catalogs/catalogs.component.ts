import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {
  categories: any;

  constructor() {
    this.categories = [
      {
        "name": 'Телефоны и Гаджеты',
        "img": 'smartphone.svg',
        "link": "smartphone"
      },
      {
        "name": 'Компьютеры',
        "img": 'computer.svg',
        "link": "computer"
      },
      {
        "name": 'Аудио',
        "img": 'audio.svg',
        "link": "audio"
      },
      {
        "name": 'Камера',
        "img": 'camera.svg',
        "link": "camera"
      },
      {
        "name": 'Телевизоры',
        "img": 'tv.svg',
        "link": "tv"
      }
    ]
  }

  ngOnInit(): void {
  }

}
