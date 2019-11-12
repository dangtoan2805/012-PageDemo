import { AreaPage } from "./../pages/area/area";
import { Area } from "./../model/Area";
import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

//// firebase
import { environment } from "../environment/environment";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
@Component({
  selector: "app",
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = AreaPage;

  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private screenOrientation: ScreenOrientation
  ) {
    platform.ready().then(() => {
      // this.screenOrientation.lock(
      //   this.screenOrientation.ORIENTATIONS.LANDSCAPE
      // );
      statusBar.hide();
      splashScreen.hide();
    });
    firebase.initializeApp(environment.firebase);
  }
}
