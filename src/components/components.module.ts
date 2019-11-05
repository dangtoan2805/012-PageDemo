import { NgModule } from "@angular/core";
import { DetailBillComponent } from "./detail-bill/detail-bill";
import { ListBillsComponent } from "./list-bills/list-bills";
import { MenuComponent } from "./menu/menu";
import { HomeBillComponent } from "./home-bill/home-bill";
import { ListTablesComponent } from "./list-tables/list-tables";
import { HomeInfoComponent } from "./popups/home-info/home-info";
@NgModule({
  declarations: [
    DetailBillComponent,
    ListBillsComponent,
    MenuComponent,
    HomeBillComponent,
    ListTablesComponent,
    HomeInfoComponent
  ],
  imports: [],
  exports: [
    DetailBillComponent,
    ListBillsComponent,
    MenuComponent,
    HomeBillComponent,
    ListTablesComponent,
    HomeInfoComponent
  ]
})
export class ComponentsModule {}
