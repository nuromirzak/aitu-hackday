import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  product2: any[] = [];
  products: any[] = [];
  categories: any[] = [];

  constructor() { 
    this.product2 = [
    {
      "img-src": "product.svg",
      "upper-title" : "Акция",
      "original-price": "478 000",
      "pre-price": "590 000",
      "description": {
        "type": 'тип: стационарная',
        "obyem": 'обьем SSD: 825 Гб',
        "support": 'поддержка UHD (4K): Да',
        "videokarta": 'тип носителя для игр: BD (Blu-ray Disc)'
      },
      "installment": '39 834₸ x 12 мес'
    },
    {
      "img-src": "product.svg",
      "upper-title" : "Акция",
      "original-price": "478 000",
      "pre-price": "590 000",
      "description": {
        "type": 'тип: стационарная',
        "obyem": 'обьем SSD: 825 Гб',
        "support": 'поддержка UHD (4K): Да',
        "videokarta": 'тип носителя для игр: BD (Blu-ray Disc)'
      },
      "installment": '39 834₸ x 12 мес'
    },
    {
      "img-src": "product.svg",
      "upper-title" : "Акция",
      "original-price": "478 000",
      "pre-price": "590 000",
      "description": {
        "type": 'тип: стационарная',
        "obyem": 'обьем SSD: 825 Гб',
        "support": 'поддержка UHD (4K): Да',
        "videokarta": 'тип носителя для игр: BD (Blu-ray Disc)'
      },
      "installment": '39 834₸ x 12 мес'
    },
    {
      "img-src": "product.svg",
      "upper-title" : "Акция",
      "original-price": "478 000",
      "pre-price": "590 000",
      "description": {
        "type": 'тип: стационарная',
        "obyem": 'обьем SSD: 825 Гб',
        "support": 'поддержка UHD (4K): Да',
        "videokarta": 'тип носителя для игр: BD (Blu-ray Disc)'
      },
      "installment": '39 834₸ x 12 мес'
    },
    {
      "img-src": "product.svg",
      "upper-title" : "Акция",
      "original-price": "478 000",
      "pre-price": "590 000",
      "description": {
        "type": 'тип: стационарная',
        "obyem": 'обьем SSD: 825 Гб',
        "support": 'поддержка UHD (4K): Да',
        "videokarta": 'тип носителя для игр: BD (Blu-ray Disc)'
      },
      "installment": '39 834₸ x 12 мес'
    },
    {
      "img-src": "product.svg",
      "upper-title" : "Акция",
      "original-price": "478 000",
      "pre-price": "590 000",
      "description": {
        "type": 'тип: стационарная',
        "obyem": 'обьем SSD: 825 Гб',
        "support": 'поддержка UHD (4K): Да',
        "videokarta": 'тип носителя для игр: BD (Blu-ray Disc)'
      },
      "installment": '39 834₸ x 12 мес'
    }
    ]
    this.products = [
      {
        "img-src": "product2.svg",
        "upper-title" : "Акция",
        "original-price": "478 000",
        "pre-price": "590 000",
        "description": {
          "Diagonal": "Диагональ экрана: 16 дюйм",
          "Cpp": "процессор: Intel Core i7 12700H",
          "videokarta": "видеокарта: NVIDIA GeForce RTX 3060",
          "type": 'тип жесткого диска: SSD',
          "obyem": 'общий обьем накопителей: 512 ГБ',
          "support": 'размер оперативной памяти: 16 ГБ',
        },
        "installment": '39 834₸ x 12 мес'
      },
      {
        "img-src": "product2.svg",
        "upper-title" : "Акция",
        "original-price": "478 000",
        "pre-price": "590 000",
        "description": {
          "Diagonal": "Диагональ экрана: 16 дюйм",
          "Cpp": "процессор: Intel Core i7 12700H",
          "videokarta": "видеокарта: NVIDIA GeForce RTX 3060",
          "type": 'тип жесткого диска: SSD',
          "obyem": 'общий обьем накопителей: 512 ГБ',
          "support": 'размер оперативной памяти: 16 ГБ',
        },
        "installment": '39 834₸ x 12 мес'
      },
      {
        "img-src": "product2.svg",
        "upper-title" : "Акция",
        "original-price": "478 000",
        "pre-price": "590 000",
        "description": {
          "Diagonal": "Диагональ экрана: 16 дюйм",
          "Cpp": "процессор: Intel Core i7 12700H",
          "videokarta": "видеокарта: NVIDIA GeForce RTX 3060",
          "type": 'тип жесткого диска: SSD',
          "obyem": 'общий обьем накопителей: 512 ГБ',
          "support": 'размер оперативной памяти: 16 ГБ',
        },
        "installment": '39 834₸ x 12 мес'
      },
      {
        "img-src": "product2.svg",
        "upper-title" : "Акция",
        "original-price": "478 000",
        "pre-price": "590 000",
        "description": {
          "Diagonal": "Диагональ экрана: 16 дюйм",
          "Cpp": "процессор: Intel Core i7 12700H",
          "videokarta": "видеокарта: NVIDIA GeForce RTX 3060",
          "type": 'тип жесткого диска: SSD',
          "obyem": 'общий обьем накопителей: 512 ГБ',
          "support": 'размер оперативной памяти: 16 ГБ',
        },
        "installment": '39 834₸ x 12 мес'
      },
      {
        "img-src": "product2.svg",
        "upper-title" : "Акция",
        "original-price": "478 000",
        "pre-price": "590 000",
        "description": {
          "Diagonal": "Диагональ экрана: 16 дюйм",
          "Cpp": "процессор: Intel Core i7 12700H",
          "videokarta": "видеокарта: NVIDIA GeForce RTX 3060",
          "type": 'тип жесткого диска: SSD',
          "obyem": 'общий обьем накопителей: 512 ГБ',
          "support": 'размер оперативной памяти: 16 ГБ',
        },
        "installment": '39 834₸ x 12 мес'
      },
      {
        "img-src": "product2.svg",
        "upper-title" : "Акция",
        "original-price": "478 000",
        "pre-price": "590 000",
        "description": {
          "Diagonal": "Диагональ экрана: 16 дюйм",
          "Cpp": "процессор: Intel Core i7 12700H",
          "videokarta": "видеокарта: NVIDIA GeForce RTX 3060",
          "type": 'тип жесткого диска: SSD',
          "obyem": 'общий обьем накопителей: 512 ГБ',
          "support": 'размер оперативной памяти: 16 ГБ',
        },
        "installment": '39 834₸ x 12 мес'
      }
    ]
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
      },
      {
        "name": 'Светотехника',
        "img": 'electric.svg',
        "link": "tv"
      },
    ]
  }

  ngOnInit(): void {
  }

}
