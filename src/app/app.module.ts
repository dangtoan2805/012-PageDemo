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
/// component===============
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [MyApp, AreaPage, BillPage, OrderPage],
  imports: [BrowserModule, ComponentsModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, OrderPage, AreaPage, BillPage],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
