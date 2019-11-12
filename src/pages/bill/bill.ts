import { Area } from "./../../model/Area";
import { AreaPage } from "./../area/area";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Bill } from "../../model/ListBill";

@Component({
  selector: "page-bill",
  templateUrl: "bill.html"
})
export class BillPage {
  header: any;
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

  areaName: Array<Area> = [];
  listBill:Array<Bill> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  ionViewWillEnter() {
    console.log("ionViewWillEnter AreaPage");
    this.header = "Mang Về";
  }

  gotoHome() {
    this.navCtrl.pop({ animate: false });
  }
}
