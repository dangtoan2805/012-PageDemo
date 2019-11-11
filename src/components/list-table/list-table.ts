import { Component, Input } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { OrderPage } from "../../pages/order/order";
@Component({
  selector: "list-table",
  templateUrl: "list-table.html"
})
export class ListTableComponent {
  // get data list table
  @Input() tang;

  /**
   * idStable: string, the number of each table
   * status: boolean, flase -> red, true -> green
   * type: 1-> cirle, 2->square
   */
  imgUrl: Array<any> = [
    { url: "../../assets/imgs/circle-green.png", color: "#41B449" },
    { url: "../../assets/imgs/circle-red.png", color: "#EC1B23" },
    { url: "../../assets/imgs/square-green.png", color: "#41B449" },
    { url: "../../assets/imgs/square-red.png", color: "#EC1B23" }
  ];

  data: Array<any> = [
    { id: 0, name: "001", status: true, type: 1 },
    { id: 1, name: "002", status: true, type: 2 },
    { id: 2, name: "003", status: false, type: 1 },
    { id: 3, name: "004", status: true, type: 2 },
    { id: 4, name: "005", status: false, type: 1 },
    { id: 5, name: "006", status: true, type: 2 },
    { id: 6, name: "007", status: false, type: 2 }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {}

  changeImgSrc(status: boolean, type: number) {
    if (status === true && type === 1) return this.imgUrl[0];
    if (status === false && type === 1) return this.imgUrl[1];
    if (status === true && type === 2) return this.imgUrl[2];
    if (status === false && type === 2) return this.imgUrl[3];
  }
  gotoOrder(item) {
    console.log(item);
    if (item.status === false) {
      let alert = this.alertCtrl.create({});
      alert.setTitle(`Bàn đã đặt !!! `);
      alert.setSubTitle(item.name);

      alert.addButton("Ok");
      // alert.addButton({
      //   text: "Ok",
      //   handler: () => {}
      // });

      alert.present();
    } else {
      this.navCtrl.push(OrderPage, item);
    }
  }
}
