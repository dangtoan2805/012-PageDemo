
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

import { MyApp } from "./app.component";
/// page=================
import { OrderPage } from "../pages/order/order";
import { AreaPage } from "../pages/area/area";
import { BillPage } from "../pages/bill/bill";
import { ToGoPage } from "../pages/to-go/to-go";
/// component===============
import { ComponentsModule } from "../components/components.module";
/// service
import { GetMenuService } from "./../pages/services/getmenu.service";
import { PushMenuService } from "./../pages/services/pushmenu.service";

@NgModule({
  declarations: [MyApp, AreaPage, BillPage, OrderPage, ToGoPage],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, { animate: false })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, OrderPage, AreaPage, BillPage, ToGoPage],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    GetMenuService,
    PushMenuService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
