import { ListBill } from "./../../model/ListBill";
import { Component } from "@angular/core";
import {
  Events,
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";

import { OrderPage } from "../../pages/order/order";
@Component({
  selector: "home-bill",
  templateUrl: "home-bill.html"
})
export class HomeBillComponent {
  arrBill: Array<ListBill> = [];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    this.getDataBill();
  }

  getDataBill() {
    this.events.subscribe("ListBillGoHome", data => {
      this.arrBill = data;
    });
  }

  updateBill(item) {
    console.log(item);
    this.events.publish("updateBill", item);
    this.navCtrl.push(OrderPage, { data: item });
  }
}
