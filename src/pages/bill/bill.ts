import { Area } from "./../../model/Area";
import { AreaPage } from "./../area/area";
import { Component } from "@angular/core";

import { NavController, NavParams, Events } from "ionic-angular";
import { GetMenuService } from "./../services/getmenu.service";
import { ListBill } from "../../model/ListBill";
import { BillDetail } from "../../model/BillDetails";
import { Table } from "../../model/Table";


@Component({
  selector: "page-bill",
  templateUrl: "bill.html"
})
export class BillPage {
  idFloor: string;
  header: string;

  areaName: Array<Area> = [];
  listTable: Array<Table> = [];
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


  listBill: Array<ListBill> = [];
  detailBill: Array<any> = [];
  idListBill: any;
  data: Array<any>; // luu obj từ firebase
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private getMenuService: GetMenuService,
    private events: Events
  ) {
    this.getListBill();
  }
  ionViewDidLoad() {}
  ionViewWillEnter() {

    this.header = "Mang Về";
  }
  getListBill() {
    // get listbill
    this.getMenuService.getListBill("bill").then(snapshot => {
      let data = snapshot.docs;
      for (let i = 0; i < data.length; i++) {
        this.listBill.push(data[i].data());
        this.listBill[i].id = data[i].id;
      }
    });

    this.getNameFloor();
  }

  getNameFloor() {
    this.getMenuService.getCollection("area").then(snapshot => {
      let data = snapshot.docs;
      for (let i = 0; i < data.length; i++) {
        this.areaName.push(data[i].data());
        this.areaName[i].id = data[i].id;
      }
      this.header = this.areaName[0].id;

      console.log("Get Area: Success !");
    });
  }

  gotoHome() {
    this.navCtrl.pop({ animate: false });
  }
  setTangHienTai(value) {
    this.header = value;
    console.log(this.header);
    this.detailBill = this.listBill.filter(
      listBill => listBill.id_area == value
    );
    console.log(this.detailBill);
  }
}
