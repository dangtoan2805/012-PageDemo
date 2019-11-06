import { IonicModule } from "ionic-angular";
import { NgModule } from "@angular/core";
import { DetailBillComponent } from "./detail-bill/detail-bill";
import { ListBillsComponent } from "./list-bills/list-bills";

import { HomeBillComponent } from "./home-bill/home-bill";
import { ListTablesComponent } from "./list-tables/list-tables";
import { MenuFoodComponent } from "./menu-food/menu-food";
import { ListTableComponent } from './list-table/list-table';

@NgModule({
  declarations: [
    DetailBillComponent,
    ListBillsComponent,
    HomeBillComponent,
    ListTablesComponent,
    MenuFoodComponent,
    ListTableComponent
  ],
  imports: [IonicModule],
  exports: [
    DetailBillComponent,
    ListBillsComponent,
    HomeBillComponent,
    ListTablesComponent,
    MenuFoodComponent,
    ListTableComponent
  ]
})
export class ComponentsModule {}
