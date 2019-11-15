import { GetMenuService } from './../../pages/services/getmenu.service';
import { OrderPage } from "./../../pages/order/order";
import { Table } from "./../../model/Table";
import { Component, Input } from "@angular/core";
import { Events } from "ionic-angular";
import {
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";
/**
 * Generated class for the ListTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "list-table",
  templateUrl: "list-table.html"
})
export class ListTableComponent {
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
  idTable: any;
  arrTable: Array<Table> = [];
  nameArea: any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public events: Events,
    public getMenuService: GetMenuService
  ) {
    events.subscribe("listTable", (name, ref) => {
      this.nameArea = name;
      this.arrTable = ref;
    });
    events.subscribe("infoABill", bill => {
      this.changeStatusTable(bill);
    });
  }

  ngOnDestroy(){
    this.events.unsubscribe("listTable");
    this.events.unsubscribe("infoABill");
  }

  changeImgSrc(status: boolean, type: number) {
    if (status === true && type === 1) return this.imgUrl[0];
    if (status === false && type === 1) return this.imgUrl[1];
    if (status === true && type === 2) return this.imgUrl[2];
    if (status === false && type === 2) return this.imgUrl[3];
  }
  gotoOrder(item) {
    if (item.status == false) {
      this.getMenuService.getCollectionById('table',item.id).then(res => {
        let data = res.data();
        let info ={
          id_bill: data.id_bill,
          nameArea: this.nameArea,
          name:item.name
        }
        this.navCtrl.push(
          OrderPage,
          {
            info_id_bill : info
          },
          { animate: false }
        );
      })
    } else {
      let data = {
        id_table: item.id,
        name: item.name,
        nameArea: this.nameArea != null ? this.nameArea : "",
        note: "Bàn" + name,
        type: item.type,
        id_area:item.id_area
      };
      
      this.navCtrl.push(
        OrderPage,
        {
          data_from_list_table: data,
        },
        { animate: false }
      );
    }
  }

  // Thay đổi trạng thái sau khi lưu bill-detail
  changeStatusTable(bill) {
    for (var i = 0; i < this.arrTable.length; i++) {
      this.arrTable[i].status =
        this.arrTable[i].name == bill.name &&  this.arrTable[i].status != false
          ? !this.arrTable[i].status
          : this.arrTable[i].status;
    }
  }
}
