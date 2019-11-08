import { Food } from './../../model/Food';
import { Component, Input } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";

import { Events } from 'ionic-angular';
@Component({
  selector: "detail-bill",
  templateUrl: "detail-bill.html"
})
export class DetailBillComponent {
  @Input() name: string;
  @Input() note: string;

  arrFood: Array<Food> = [];
  tamTinh: number = 0;
  phuPhi: number = 0;
  vat: number = 0;
  total: number = 0;


  constructor(
    public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    events.subscribe('infoAFood', food => { this.addToBill(food) });
  }

  addToBill(food) {
    // Tạo 1 bản sao để khi thay đổi giá trị food không thay đổi
    let item = Object.assign({}, food);

    let index = this.arrFood.findIndex(arrFood => arrFood.id == item.id)

    if (index != -1) {
      this.arrFood[index].number = this.arrFood[index].number + item.number;
    }
    else {
      this.arrFood.push(item);
    }
    this.updatePrice();
  }

  updatePrice() {
    this.tamTinh = 0;
    for (let item in this.arrFood) {
      this.tamTinh += this.arrFood[item].price * this.arrFood[item].number;
    }
    this.total = this.tamTinh + this.vat + this.phuPhi;
  }

  delete(item) {
    const index = this.arrFood.findIndex(menuFood => menuFood.id == item.id);
    this.arrFood.splice(index, 1);
    this.updatePrice();
  }

  up(item) {
    item.number++;
    this.updatePrice();
  }

  down(item) {
    if (item.number > 1) {
      item.number--;
      this.updatePrice();
    }
  }

  updateMenu(item) {
    console.log(item);
    let alert = this.alertCtrl.create({});
    alert.setTitle(`Chỉnh sữa`);

    alert.setSubTitle(item.name);

    alert.addInput({
      type: "number",
      value: item.number,
      name: "number"
    });

    alert.addInput({
      type: "textarea",
      value: item.description,
      name: "description"
    });

    alert.addButton("Hủy");
    alert.addButton({
      text: "Ok",
      handler: data => {
        console.log("Checkbox data:", data);
        console.log(item);
        item.description = data.description;
        item.number = parseInt(data.number);
        this.arrFood.push(item);
        this.arrFood = Array.from(new Set(this.arrFood));
        this.updatePrice();
      }
    });

    alert.present();
  }
}
