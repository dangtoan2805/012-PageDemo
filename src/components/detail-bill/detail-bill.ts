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
  data: any;
  @Input("note") note: any;
  @Input("name") name: any;
  @Input("tamtinh") tamtinh: number;
  @Input("vat") vat: number;
  @Input("total") total: number;
  @Input("menu") menuFood: Array<any>;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.data = this.navParams.get("data");
    console.log(this.data);
  }
  ionViewDidLoad() {
    console.log(this.note);
  }
  sum() {
    if ((this.tamtinh = this.menuFood.reduce((a, b) => a + b.price, 0))) {
      this.vat = 0.1 * this.tamtinh;
      this.total = this.tamtinh + this.vat;
    }

    console.log(this.tamtinh);
  }
  sub() {
    if ((this.tamtinh = this.menuFood.reduce((a, b) => a - b.price * -1, 0))) {
      this.vat = 0.1 * this.tamtinh;
      this.total = this.tamtinh + this.vat;
    }
    console.log(this.tamtinh);
  }

  down(item) {
    if (item.number > 1) {
      item.number--;
      item.price = item.number * item.default;
      this.sub();

      // this.tamtinh = this.menuFood.reduceRight((a, b) => b - a.price, 0);
      // this.vat = 0.1 * this.tamtinh;
      // this.total = this.tamtinh + this.vat;
    }
  }
  up(item) {
    item.number++;
    item.price = item.number * item.default;
    this.sum();

    // this.tamtinh = this.menuFood.reduceRight((a, b) => a + b.price, 0);
    // this.vat = 0.1 * this.tamtinh;
    // this.total = this.tamtinh + this.vat;
  }
  delete(item) {
    const index = this.menuFood.findIndex(menuFood => menuFood.id == item.id);
    if (this.menuFood.splice(index, 1)) {
      item.price = item.default;
      item.number = 1;

      // this.sub();
    }

    if (this.menuFood.length == 0) {
      this.tamtinh = 0;
      this.vat = 0;
      this.total = 0;
    }
    this.sub();
    console.log(this.menuFood);

    // this.tamtinh = this.menuFood.reduceRight((a, b) => a - b.price, 0);
    // this.vat = 0.1 * this.tamtinh;
    // this.total = this.tamtinh + this.vat;
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
      value: item.note,
      name: "note"
    });

    alert.addButton("Hủy");
    alert.addButton({
      text: "Ok",
      handler: data => {
        console.log("Checkbox data:", data);
        console.log(item);

        item.note = data.note;
        item.number = data.number;
        item.price = data.number * item.price;
        this.menuFood.push(item);
        this.menuFood = Array.from(new Set(this.menuFood));
      }
    });

    alert.present();
  }
}
