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
  listBill: Array<ListBill> = [];
  idListBill: any;
  data: Array<any>; // luu obj từ firebase
  defaultListBill:Array<ListBill> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private getMenuService: GetMenuService,
    private events: Events
  ) {
    this.getListBill();    
    // Nhan id bill tu component list-bills
    this.events.subscribe('viewDetailBill', (id_bill_detail, name) => {
      this.getMenuService.getBillDetailById('bill_detail',id_bill_detail).then(res => { 
        let billDetail = res.data();
        console.log(name + " and " + this.idFloor);
        this.events.publish(
          'sendDetailBill',
          billDetail,
        );
      });
    });
  }

  ionViewWillEnter() {
    
  }
  getListBill() {
    // get listbill
    this.getMenuService.getListBill("bill").then(snapshot => {
      let data = snapshot.docs;
      for (let i = 0; i < data.length; i++) {
        this.listBill.push(data[i].data());
        this.listBill[i].id = data[i].id;
      }
      this.defaultListBill = this.listBill.filter(
        listBill => listBill.id_area == this.navParams.get("id")
      );
      console.log("default:", this.defaultListBill);
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
      this.header = this.navParams.get("id");
    });
  }

  gotoHome() {
    this.navCtrl.pop({ animate: false });
  }

  setTangHienTai(value) {
    this.header = value;
    let detailBill = this.listBill.filter(
      listBill => listBill.id_area == value
    );
    this.events.publish("ListBill",detailBill)
  }
}
