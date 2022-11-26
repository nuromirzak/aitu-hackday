import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.scss']
})
export class CatalogProductComponent implements OnInit {
  @Input() product: any;
  isActiveMark:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  isActiveBookmark() {
    this.isActiveMark = !this.isActiveMark;
  }

}
