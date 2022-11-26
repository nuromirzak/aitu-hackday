import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

interface Product {
  product_id: Number,
  item_name: String,
  item_category: String,
  img_url: String,
  shop: String,
  shop_addresses: [{address : String, coordinate: {lng : String, lat : String}}]
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any;
  url;
  private readonly next$: Subject<void>;
  protected readonly destroyed$: Observable<void>;

  constructor(
    private http: HttpClient
  ) { 
    this.url = '/api/';
    this.next$ = new Subject<void>();
    this.destroyed$ = this.next$.asObservable();
  }

  getProductsData() {
    return this.http.get(`${this.url}`)
  }

  addProducts(link) {
    this.http.get(`${this.url}${link}`).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(res => {
      this.products = res;
      return res;
    })
  }

  returnAllData() {
    return this.products
  }

  showProducts() {
    console.log(this.products);
  }

  getProduct(id: number) {
    return this.products.find(product => {
      product['_id'] === id;
    })
  }
}
