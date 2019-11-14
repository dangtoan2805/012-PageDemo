import { Events } from "ionic-angular";

import { Component, Input } from "@angular/core";
import { GetMenuService } from "../../pages/services/getmenu.service";
import { ListBill } from "../../model/ListBill";

@Component({
  selector: "list-bills",
  templateUrl: "list-bills.html"
})
export class ListBillsComponent {
  @Input() listBill: Array<ListBill> = [];

  constructor(private events: Events) {
    this.events.subscribe("ListBill", data => {
      // get listbill from BillPage to actice
      this.listBill = data;
      console.log(this.listBill);
    });
  }

  // item: info a bill
  viewDetailBill(item) {
    console.log(item);
    this.events.publish("listbill_infoABill", item);
  }
}
