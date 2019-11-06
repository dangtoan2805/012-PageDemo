import { Component, Input } from "@angular/core";

@Component({
  selector: "detail-bill",
  templateUrl: "detail-bill.html"
})
export class DetailBillComponent {
  @Input("note") note: any;
  @Input("name") name: any;
  constructor() {}
  ionViewDidLoad() {
    console.log(this.note);
  }
}
