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
  data: Array<any> = [
    { id: 0, name: "Anh Hai", price: 5000000 },
    { id: 1, name: "Anh C", price: 300000 },
    { id: 2, name: "Anh B", price: 400000 },
    { id: 3, name: "Anh A", price: 3000000 },
    { id: 4, name: "Chi M", price: 980000 },
    { id: 5, name: "Anh K", price: 1230000 }
  ];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    events.subscribe("infoABill", bill => {
      this.addToListBill(bill);
    });
    
    this.events.subscribe("data", (area) => {
      console.log("Area: ",area);
    });
  }

  addToListBill(bill) {
    this.data.push(bill);
  }
  updateBill(item) {
    console.log(item);
    this.events.publish("updateBill", item);
    this.navCtrl.push(OrderPage);
  }
}
