
import { Component, Input } from "@angular/core";
import { GetMenuService } from "../../pages/services/getmenu.service";
import { ListBill } from "../../model/ListBill";

@Component({
  selector: "list-bills",
  templateUrl: "list-bills.html"
})
export class ListBillsComponent {
  @Input() listBill: Array<ListBill>;
  bill: Array<any> = [
    {
      id: 0,
      name: "Anh Khoa asda asdas asdsa ",
      date: "24/10/1999",
      price: 500000000,
      status: true
    },
    {
      id: 1,
      name: "Anh A",
      date: "24/10/1999",
      price: 1000000000,
      status: true
    },
    {
      id: 2,
      name: "Anh B",
      date: "24/10/1999",
      price: 5000000,
      status: false
    },
    {
      id: 3,
      name: "Anh C",
      date: "24/10/1999",
      price: 50000000,
      status: false
    },
    {
      id: 4,
      name: "Anh D",
      date: "24/10/1999",
      price: 500000,
      status: false
    },
    {
      id: 5,
      name: "Anh E",
      date: "24/10/1999",
      price: 500000,
      status: true
    },
    {
      id: 6,
      name: "Anh F",
      date: "24/10/1999",
      price: 500000,
      status: true
    },
    {
      id: 7,
      name: "Anh Khoa",
      date: "24/10/1999",
      price: 500000,
      status: false
    },
    {
      id: 8,
      name: "Anh Khoa",
      date: "24/10/1999",
      price: 80000000,
      status: true
    }
  ];

  ViewDetailBill(item) {
    console.log(item);
  }
}
