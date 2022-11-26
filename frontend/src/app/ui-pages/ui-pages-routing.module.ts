import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CatalogBodyComponent } from "../components/catalog-body/catalog-body.component";
import { CatalogPageComponent } from "./catalog-page/catalog-page.component";
import { CatalogsComponent } from "./catalogs/catalogs.component";

const routes: Routes = [
    {
      path: '',
      component: CatalogsComponent,
    },
    {
      path: ':name',
      component: CatalogPageComponent,
      children: [
        {path: '', component: CatalogBodyComponent}
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UiPagesRoutingModule { }