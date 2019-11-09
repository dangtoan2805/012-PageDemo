import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";
import { Events } from "ionic-angular";
import { OrderPage } from "../../pages/order/order";
import { AreaPage } from "../../pages/area/area";
@Component({
  selector: "home-bill",
  templateUrl: "home-bill.html"
})
export class HomeBillComponent {
  data: Array<any> = [
    { id: 0, name: "Anh Hai", price: 5000000 },
    { id: 1, name: "Anh Hai", price: 5000000 },
    { id: 2, name: "Anh Hai", price: 5000000 },
    { id: 3, name: "Anh Hai", price: 5000000 },
    { id: 4, name: "Anh Hai", price: 5000000 },
    { id: 5, name: "Anh Hai", price: 5000000 }
  ];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    events.subscribe("save", menu => {
      console.log(menu);
      this.data.push(menu);
    });
  }
  gotoBill(item) {
    console.log(item);
  }
  updateBill(item) {
    this.events.publish("updateBill", item);
    this.navCtrl.push(OrderPage);
  }
}
