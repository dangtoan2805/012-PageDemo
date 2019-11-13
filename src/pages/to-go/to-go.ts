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
  iaArea: string;
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
    this.iaArea = navParams.get("item");
    // set Segment header
    this.header = this.areaName[
      this.areaName.findIndex(areaName => areaName.id == this.iaArea)
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

      this.events.publish("listTable", this.header, this.listTable.filter(
        arrListFood => arrListFood.id_area == this.iaArea
      )
      );
    });
  }

  gotoHome() {
    this.navCtrl.push(AreaPage, {}, { animate: false });
  }

  goToBill() {
    this.navCtrl.push(BillPage, { id: this.iaArea }, { animate: false });
  }

  // khi click vao 1 tang no se set lai gia tri o day de get data, thay the gia tri nay bang 1 array cua list table
  setTangHienTai(value) {
    this.iaArea = value;
    this.events.publish("listTable",this.header,this.listTable.filter(listTable => listTable.id_area == value)
    );
  }
}
