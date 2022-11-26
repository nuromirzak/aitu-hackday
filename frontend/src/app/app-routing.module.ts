import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './ui-pages/cart-page/cart-page.component';
import { CatalogPageComponent } from './ui-pages/catalog-page/catalog-page.component';
import { LoginPageComponent } from './ui-pages/login-page/login-page.component';
import { MainPageComponent } from './ui-pages/main-page/main-page.component';
import { MapPageComponent } from './ui-pages/map-page/map-page.component';
import { ProductPageComponent } from './ui-pages/product-page/product-page.component';
import { ProfilePageComponent } from './ui-pages/profile-page/profile-page.component';
import { RegistrationPageComponent } from './ui-pages/registration-page/registration-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'map',
    component: MapPageComponent
  },
  {
    path: 'registration',
    component: RegistrationPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: 'products',
    component: ProductPageComponent
  },
  {
    path: 'products/:id',
    component: ProductPageComponent
  },
  {
    path: 'catalog',
    loadChildren: () => import('./ui-pages/ui-pages.module').then(m => m.UiPagesModule)
  },

  {
    path: '**',
    component: MainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
