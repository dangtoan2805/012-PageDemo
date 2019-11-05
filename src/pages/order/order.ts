import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-order",
  templateUrl: "order.html"
})
export class OrderPage {
  menu: Array<any> = [
    {
      id: 1,
      name: "Menu 1"
    },
    {
      id: 2,
      name: "Menu 2"
    },
    {
      id: 3,
      name: "Menu 3"
    },
    {
      id: 4,
      name: "Menu 4"
    },
    {
      id: 5,
      name: "Menu 5"
    },
    {
      id: 6,
      name: "Menu 6"
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad OrderPage");
  }
}
