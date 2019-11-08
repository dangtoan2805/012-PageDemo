import { Component } from "@angular/core";
import { Events } from 'ionic-angular';

/**
 * Generated class for the HomeBillComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "home-bill",
  templateUrl: "home-bill.html"
})
export class HomeBillComponent {
  text: string;

  data: Array<any> = [
    { id: 0, name: "Anh Hai", price: 5000000 },
    { id: 1, name: "Anh C", price: 300000 },
    { id: 2, name: "Anh B", price: 400000 },
    { id: 3, name: "Anh A", price: 3000000 },
    { id: 4, name: "Chi M", price: 980000 },
    { id: 5, name: "Anh K", price: 1230000 },
  ];

  constructor(public events: Events) {
    events.subscribe('infoABill', bill => { this.addToListBill(bill) });
  }

  addToListBill(bill){
    this.data.push(bill);
  }
}
