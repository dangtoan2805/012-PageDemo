import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { BillPage } from "./../bill/bill";

@Component({
  selector: "page-order",
  templateUrl: "order.html"
})
export class OrderPage {
  name: any;
  note: any;
  data: any;
  footer: string;
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
    this.getNote();
  }
  
  ionViewWillEnter() {
    this.footer = "Menu 1";
  }

  getNote() {
    this.data = this.navParams.get("data");
    this.name = this.data.name;
    this.note = this.data.note;
  }

  goToBill() {
    console.log("aaaaa");

    this.navCtrl.push(BillPage, {}, { animate: false });
  }

  goBack() {
    this.navCtrl.pop({ animate: false });
  }
}
