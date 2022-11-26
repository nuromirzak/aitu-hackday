import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  productId;
  categoryName;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    
  }

  ngOnInit(): void {
  }

}
