import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-catalog-body',
  templateUrl: './catalog-body.component.html',
  styleUrls: ['./catalog-body.component.scss']
})
export class CatalogBodyComponent implements OnInit {
  categories: any;
  categoryGoods: any;
  private readonly next$: Subject<void>;
  protected readonly destroyed$: Observable<void>;

  url:string;
  sanitizedUrl: SafeResourceUrl;
  objectURL;
  productId;
  categoryName;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.next$ = new Subject<void>();
    this.destroyed$ = this.next$.asObservable();

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

    this.categoryGoods = [
      // {
      //     "_id":"63808e3ced9dc3a77bc4232e",
      //   "product_id":1,
      //   "item_name":"Телевизор TCL 43S5200",
      //   "item_category":"Телевизоры",
      //   "img_url":"https://static.shop.kz/upload/iblock/4ad/wai6735rh67sdv3lt3b5w1gq72hm6bg6/00000165314_12345.jpg",
      //   "price":124400,
      //   "shop":"Белый Ветер",
      //   "createdAt":"2022-11-25T09:43:24.767Z",
      //   "updatedAt":"2022-11-25T09:43:24.767Z",
      //   "shop_addresses"
      //   "__v":0
      // },
    ]
    
    this.route.queryParams.subscribe(
      params => {
        this.productId = params['id'];
        this.categoryName = params['link']

        console.log(this.categoryName)
        console.log(this.productService.addProducts(this.categoryName))

        this.categoryGoods = this.productService.returnAllData();
        console.log(this.categoryGoods)
      }
    )

   }

  ngOnInit(): void {
  }

}
