import { AreaPage } from './../area/area';
import { BillPage } from './../bill/bill';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-to-go',
  templateUrl: 'to-go.html',
})
export class ToGoPage {
  idTang;

  tang: Array<any> = [
    {
      id: 1,
      name: "Tầng 1"
    },
    {
      id: 2,
      name: "Tầng 2"
    },
    {
      id: 3,
      name: "Tầng 3"
    },
    {
      id: 4,
      name: "Tầng 4"
    },
    {
      id: 5,
      name: "Tầng 5"
    },
    {
      id: 6,
      name: "Tầng 6"
    }
  ];

  menu: Array<any> = [
    {
      id: 1,
      name: "Menu 1"
    },
    {
      id: 2,
      name: "Menu 2"
    },
    {
      id: 3,
      name: "Menu 3"
    },
    {
      id: 4,
      name: "Menu 4"
    },
    {
      id: 5,
      name: "Menu 5"
    },
    {
      id: 6,
      name: "Menu 6"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.idTang=navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToGoPage');
  }

  gotoHome() {
    this.navCtrl.push(AreaPage, {}, { animate: false });
  }

  goToBill() {
    this.navCtrl.push(BillPage, {}, { animate: false });
  }

  // khi click vao 1 tang no se set lai gia tri o day de get data, thay the gia tri nay bang 1 array cua list table
  setTangHienTai(value){
    this.idTang = value;
    console.log(this.idTang);
  }
}
