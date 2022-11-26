import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { HeaderSecondNavbarComponent } from './header-second-navbar/header-second-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CatalogBodyComponent } from './catalog-body/catalog-body.component';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { SaleProductComponent } from './sale-product/sale-product.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';




@NgModule({
  declarations: [
    HeaderNavbarComponent,
    HeaderSecondNavbarComponent,
    SidebarComponent,
    CatalogBodyComponent,
    BannerComponent,
    SaleProductComponent,
    CategoryItemComponent,
    CatalogProductComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ], 
  exports: [
    HeaderNavbarComponent,
    HeaderSecondNavbarComponent,
    SidebarComponent,
    CatalogBodyComponent,
    BannerComponent,
    SaleProductComponent,
    CategoryItemComponent,
    CatalogProductComponent
  ]
})
export class ComponentsModule { }
