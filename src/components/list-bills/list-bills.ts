import { Events } from 'ionic-angular';

import { Component, Input } from "@angular/core";
import { GetMenuService } from "../../pages/services/getmenu.service";
import { ListBill } from "../../model/ListBill";

@Component({
  selector: "list-bills",
  templateUrl: "list-bills.html"
})
export class ListBillsComponent {
  @Input() listBill:Array<ListBill> = [];

  constructor(private events:Events){
    this.events.subscribe("ListBill", data => {
      this.listBill = data;
    })
  }

  ViewDetailBill(item) {
    this.events.publish(
      'viewDetailBill',
      item.id_bill_detail,
      item.name
    );
  }
}
