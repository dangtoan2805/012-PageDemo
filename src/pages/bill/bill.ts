import { Area } from "./../../model/Area";
import { AreaPage } from "./../area/area";
import { Component, Input } from "@angular/core";

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
  idArea: string;
  header: string; // name menuSegment
  areaName: Array<Area> = [];
  listBill: Array<ListBill> = [];
  listBillFilter: Array<ListBill> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private getMenuService: GetMenuService,
    private events: Events
  ) {
    this.idArea = this.navParams.get("id"); // get id from AreaPage, TogoPage to active Listbill

    this.getData();
    events.subscribe("listbill_infoABill", data => {
      // get data from listbill

      this.sendInfoBill(data);
    });
  }

  getData() {
    // get list area to show Area's name on header Segment
    this.getMenuService.getCollection("area").then(snapshot => {
      let data = snapshot.docs;
      for (let i = 0; i < data.length; i++) {
        this.areaName.push(data[i].data());
        this.areaName[i].id = data[i].id;
      }
      this.header = this.navParams.get("id");
    });
    console.log("checkpoint");

    // get list bill to publish to DetailBill
    this.getMenuService.getListBill("bill").then(snapshot => {
      let data = snapshot.docs;
      for (let i = 0; i < data.length; i++) {
        this.listBill.push(data[i].data());
        this.listBill[i].id = data[i].id;
      }
      console.log("check point");
      this.setDataBillFilter(this.idArea);
    });
  }

  getTableByIdArea(id_area) {
    // get id_area
    let listTable: Array<Table> = [];

    if (id_area == "id_gohome") {
      let table: Table = {
        id: "id_gohome",
        id_area: "id_gohome",
        name: "",
        status: false,
        type: 0
      };
      this.listBillFilter = new Array();
      listTable.push(table);
      this.findBillByIdTable(listTable); // get listtable
    } else {
      this.getMenuService.getTableByIdArea(id_area).then(snapshot => {
        this.listBillFilter = new Array();
        // get mảng table của khu vực có ia_area
        let data = snapshot.docs;
        for (let i = 0; i < data.length; i++) {
          listTable.push(data[i].data());
          listTable[i].id = data[i].id;
        }
        console.log(listTable);
        this.findBillByIdTable(listTable);
      });
    }

    console.log("show", listTable);
    this.events.publish("ListBill", listTable);
  }

  findBillByIdTable(listTable) {
    // get các bill có trong khu vực
    for (let index in listTable) {
      let arr = this.listBill.filter(
        listBill => listBill.id_table == listTable[index].id
      );
      for (let i in arr) {
        this.listBillFilter.push(arr[i]);
      }
    }
    console.log("listBillFilter " + this.listBillFilter);
    this.events.publish("ListBill", this.listBillFilter);
  }

  gotoHome() {
    this.navCtrl.pop({ animate: false });
  }

  setDataBillFilter(id_area) {
    console.log(id_area);
    this.header = id_area;
    this.getTableByIdArea(id_area);
  }

  sendInfoBill(data) {
    let nameArea: string;
    if (this.idArea == "id_gohome") {
      nameArea = "Mang về";
    } else {
      let index = this.areaName.findIndex(
        areaName => areaName.id == this.idArea
      );
      nameArea = this.areaName[index].name;
    }
    this.events.publish("bill_infoABill", data,nameArea);
  }
}
