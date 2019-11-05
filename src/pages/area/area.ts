import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-area",
  templateUrl: "area.html"
})
export class AreaPage {
  tang: Array<any> = [
    {
      id: 0,
      name: "Mang Về"
    },
    {
      id: 1,
      name: "Tầng 1"
    },
    {
      id: 2,
      name: "Tầng 2"
    },
    {
      id: 3,
      name: "Tầng 3"
    },
    {
      id: 4,
      name: "Tầng 4"
    },
    {
      id: 5,
      name: "Tầng 5"
    },
    {
      id: 6,
      name: "Tầng 6"
    }
  ];
  menu: Array<any> = [
    // {
    //   id: 0,
    //   name: "Hóa Đơn"
    // },
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
    console.log("ionViewDidLoad AreaPage");
  }
}
