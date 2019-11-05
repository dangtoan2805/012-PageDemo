import { OrderPage } from './../../order/order';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

@Component({
  selector: 'page-home-info',
  templateUrl: 'home-info.html',
})
export class HomeInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtr: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInfoPage');
  }

  goToBaseScreen() {
    this.navCtrl.push(OrderPage);

    this.viewCtr.dismiss(); // tat popups
  }
  cancel() {
    this.viewCtr.dismiss();
  }
}
