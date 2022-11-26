import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-product',
  templateUrl: './sale-product.component.html',
  styleUrls: ['./sale-product.component.scss']
})
export class SaleProductComponent implements OnInit {
  @Input() product: any;
  isActiveMark:boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  isActiveBookmark() {
    this.isActiveMark = !this.isActiveMark;
  }

}
