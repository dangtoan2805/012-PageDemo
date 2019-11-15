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
    let info ={
      id_bill: item.id,
      nameArea: "Mang về",
      name:item.name
    }
    this.navCtrl.push(
      OrderPage,
      {
        info_id_bill : info
      },
      { animate: false }
    );
  }
}
