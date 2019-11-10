import { OrderPage } from './../../pages/order/order';
import { Table } from './../../model/Table';
import { Component, Input } from '@angular/core';
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
  selector: 'list-table',
  templateUrl: 'list-table.html'
})
export class ListTableComponent {

 /**
   * idStable: string, the number of each table 
   * status: boolean, flase -> red, true -> green
   * type: 1-> cirle, 2->square
   */
  imgUrl: Array<any> = [
    {url: "../../assets/imgs/circle-green.png", color: "#41B449"},
    {url: "../../assets/imgs/circle-red.png", color: "#EC1B23"},
    {url: "../../assets/imgs/square-green.png", color: "#41B449"},
    {url: "../../assets/imgs/square-red.png", color: "#EC1B23"},
    ];
  
  arrTable: Array<Table> = [];

  constructor( public navParams: NavParams,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public alertCtrl: AlertController,public events: Events) {
    events.subscribe("listTable", ref => {
      this.arrTable = ref;
      console.log("revice list table: success!",this.arrTable);
    });
  }

  getData(){
  }

  changeImgSrc(status: boolean, type:number){
    if(status === true && type === 1)
      return this.imgUrl[0];
    if(status === false && type === 1)
      return this.imgUrl[1];
    if(status === true && type === 2)
      return this.imgUrl[2]; 
    if(status === false && type === 2)
      return this.imgUrl[3];
  }

   // Vừa thêm
   openInfo(name) {
    let data = {floor: this.arrTable[0].name, name: name};
    console.log(data);
    this.navCtrl.push(
      OrderPage,
      {
        data: data,
        title: this.arrTable,
      },
      { animate: false }
    );
  }

   // Thay đổi trạng thái sau khi lưu bill-detail
   changeStatusTable(bill)
   {
     for(var i = 0; i < this.arrTable.length; i++)
       this.arrTable[i].status = this.arrTable[i].name == bill.name ? !this.arrTable[i].status : this.arrTable[i].status;
   }
}
