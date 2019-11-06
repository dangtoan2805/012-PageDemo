import { HomeBillComponent } from "./../components/home-bill/home-bill";
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
import { HomeInfoPage } from "../pages/popups/home-info/home-info";
/// component===============
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [MyApp, AreaPage, BillPage, OrderPage, HomeInfoPage],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, { animate: false })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, OrderPage, AreaPage, BillPage, HomeInfoPage],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
