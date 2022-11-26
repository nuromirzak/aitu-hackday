import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageHeaderComponent } from './main-page-header/main-page-header.component';
import { ComponentsModule } from '../components/components.module';
import { MainPageFooterComponent } from './main-page-footer/main-page-footer.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { UiPagesRoutingModule } from './ui-pages-routing.module';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { MapPageComponent } from './map-page/map-page.component';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductPageComponent } from './product-page/product-page.component';

const mapConfig: YaConfig = {
  apikey: '5dd86d44-769f-48a2-a37a-860ed68c9dfe',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    MainPageComponent,
    MainPageHeaderComponent,
    MainPageFooterComponent,
    CatalogPageComponent,
    CatalogsComponent,
    MapPageComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    ProfilePageComponent,
    CartPageComponent,
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UiPagesRoutingModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    ReactiveFormsModule
  ],
  exports: [
    MainPageHeaderComponent,
    MainPageFooterComponent
  ]
})
export class UiPagesModule { }
