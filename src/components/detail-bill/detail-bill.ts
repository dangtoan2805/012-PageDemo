import { Food } from './../../model/Food';
import { Component, Input } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";
@Component({
  selector: "detail-bill",
  templateUrl: "detail-bill.html"
})
export class DetailBillComponent {
  @Input() name:string;
  @Input() note:string;
  @Input() arrFood: Array<Food>; // mảng info các món ăn dc thêm vào bill

  //data:any;
  @Input() tamTinh:number = 0;
  @Input() phuPhi:number = 0;
  @Input() vat:number = 0;
  @Input() total:number = 0;


  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    //this.data = this.navParams.get("data");
    //console.log(this.data);
    console.log(this.arrFood)
   
  }

  ionViewDidLoad() {
    this.sum();
  }

  sum() {
    if ((this.tamTinh = this.arrFood.reduce((a, b) => a + b.price, 0))) {
      this.vat = 0.1 * this.tamTinh;
      this.total = this.tamTinh + this.vat;
    }
    console.log(this.tamTinh);
  }

  sub() {
    if ((this.tamTinh = this.arrFood.reduce((a, b) => a - b.price * -1, 0))) {
      this.vat = 0.1 * this.tamTinh;
      this.total = this.tamTinh + this.vat;
    }
    //console.log(this.tamtinh);
  }

  down(item) {
    if (item.number > 1) {
      item.number--;
      item.price = item.number * item.priceDefault;
      this.sub();

      // this.tamtinh = this.menuFood.reduceRight((a, b) => b - a.price, 0);
      // this.vat = 0.1 * this.tamtinh;
      // this.total = this.tamtinh + this.vat;
    }
  }

  up(item) {
    item.amount++;
    item.price = item.amount * item.priceDefault;
    this.sum();

    this.tamTinh = this.arrFood.reduceRight((a, b) => a + b.priceDefault, 0);
    this.vat = 0.1 * this.tamTinh;
    this.total = this.tamTinh + this.vat;
  }

  delete(item) {
    const index = this.arrFood.findIndex(menuFood => menuFood.id == item.id);
    if (this.arrFood.splice(index, 1)) {
      item.price = item.default;
      item.amount = 1;

      this.sub();
    }

    if (this.arrFood.length == 0) {
      this.tamTinh = 0;
      this.vat = 0;
      this.total = 0;
    }

    this.sub();
    console.log(this.arrFood);

    this.tamTinh = this.arrFood.reduceRight((a, b) => a - b.priceDefault, 0);
    this.vat = 0.1 * this.tamTinh;
    this.total = this.tamTinh + this.vat;
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
        item.amount = data.amount;
        item.price = data.amount * item.priceDefault;
        this.arrFood.push(item);
        this.arrFood = Array.from(new Set(this.arrFood));
      }
    });

    alert.present();
  }
}
