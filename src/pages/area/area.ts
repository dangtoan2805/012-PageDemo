import { BillPage } from './../bill/bill';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams ,ModalController} from "ionic-angular";
import {HomeInfoPage} from "../popups/home-info/home-info"

@Component({
  selector: "page-area",
  templateUrl: "area.html"
})

export class AreaPage {
  id: any;
  footer: any = 1;
  items: Array<any>;
  bill: Array<any> = [];
  bills: any = "";
  data: any;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AreaPage");
  }

  openInfo() {
    let modal = this.modalCtrl.create(HomeInfoPage);
    modal.present();
  }

  gotobill(){
    console.log("aaaaa");
    this.navCtrl.push(BillPage);
  }

  // segmentChanged() {
  //   if (this.footer == "logout") {
  //     this.logout();
  //   }
  // }

  gotomenu(event) {
    // console.log(event.value);
  }

}
