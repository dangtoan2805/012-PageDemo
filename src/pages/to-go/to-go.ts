import { GetMenuService } from "./../services/getmenu.service";
import { Area } from "./../../model/Area";
import { AreaPage } from "./../area/area";
import { BillPage } from "./../bill/bill";
import { Component, Input } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Table } from "../../model/Table";
import { Events } from "ionic-angular";

@Component({
  selector: "page-to-go",
  templateUrl: "to-go.html"
})
export class ToGoPage {
  idFloor: string;
  header: string;

  areaName: Array<Area> = [];
  listTable: Array<Table> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private getMenuService: GetMenuService,
    public events: Events
  ) {
    this.areaName = navParams.get("data");
    this.idFloor = navParams.get("item");
    console.log(this.areaName, this.idFloor);
    // set Segment header
    this.header = this.areaName[
      this.areaName.findIndex(areaName => areaName.id == this.idFloor)
    ].name;
    // get list table
    this.getData();
  }

  getData() {
    this.getMenuService.getCollection("table").then(snapshot => {
      let data = snapshot.docs;
      for (let i = 0; i < data.length; i++) {
        this.listTable.push(data[i].data());
        this.listTable[i].id = data[i].id;
      }
      console.log("Get Table: Success !");
      this.events.publish(
        "listTable",
        this.header,
        this.listTable.filter(
          arrListFood => arrListFood.id_area == this.idFloor
        )
      );
    });
  }

  gotoHome() {
    this.navCtrl.push(AreaPage, {}, { animate: false });
  }

  goToBill() {
    this.navCtrl.push(BillPage, {}, { animate: false });
  }

  // khi click vao 1 tang no se set lai gia tri o day de get data, thay the gia tri nay bang 1 array cua list table
  setTangHienTai(value) {
    this.idFloor = value;
    this.events.publish(
      "listTable",
      this.header,
      this.listTable.filter(listTable => listTable.id_area == value)
    );
  }
}
