import { AreaPage } from "./../../pages/area/area";
import { Food } from "./../../model/Food";
import { Component, Input } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  AlertController,
  Events
} from "ionic-angular";
import { GetMenuService } from "../../pages/services/getmenu.service";
import { PushMenuService } from "../../pages/services/pushmenu.service";

@Component({
  selector: "detail-bill",
  templateUrl: "detail-bill.html"
})
export class DetailBillComponent {
  @Input() name: string;
  @Input() note: string;
  idTable: string;
  nameArea: string;
  nameHome: string;
  arrFood: Array<FoodTemp> = [];
  tamTinh: number = 0;
  phuPhi: number = 0;
  vat: number = 0;
  total: number = 0;
  btnHidden: boolean = true;
  idArea: string;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private getmenuservice: GetMenuService,
    private pushmenuservice: PushMenuService
  ) {
    this.getEventData();
  }
  getEventData() {
    this.events.subscribe("data", dataTable => {
      console.log(dataTable);
      this.idTable = dataTable.id;
      this.nameArea = dataTable.nameFloor;
      this.idArea = dataTable.id_area;
    });

    this.events.subscribe("name", name => {
      console.log(name);
      this.nameHome = name;
    });

    this.events.subscribe("infoAFood", food => {
      this.addToBill(food);
    });

    this.events.subscribe("updateBill", update => {
      (this.name = update.name),
        (this.note = update.note),
        (this.arrFood = update.arrFood);
    });
  }

  addToBill(food) {
    // Tạo 1 bản sao để khi thay đổi giá trị food không thay đổi
    let item = Object.assign({}, food);
    console.log(item.id);

    let index = this.arrFood.findIndex(arrFood => arrFood.id == item.id);

    if (index != -1) {
      this.arrFood[index].number = this.arrFood[index].number + item.number;
      this.arrFood[index].priceTotal += item.number * item.price;
      this.arrFood[index].description += " +" + item.description;
    } else {
      this.arrFood.push(item);
      this.arrFood[this.arrFood.length - 1].priceTotal = item.price;
    }
    this.updatePrice();
    this.btnHidden = false;
  }

  updatePrice() {
    this.tamTinh = 0;
    for (let item in this.arrFood) {
      this.tamTinh += this.arrFood[item].priceTotal;
    }
    console.log(this.total * this.vat);
    this.total = this.tamTinh + this.total * this.vat + this.phuPhi;
  }

  delete(item) {
    let alert = this.alertCtrl.create({});
    alert.setTitle(`Xóa Thực Đơn !!!`);
    alert.setSubTitle(item.name);

    alert.addButton("Hủy");
    alert.addButton({
      text: "Ok",
      handler: () => {
        const index = this.arrFood.findIndex(
          menuFood => menuFood.id == item.id
        );
        this.arrFood.splice(index, 1);
        this.updatePrice();
        if (this.arrFood.length < 1) {
          this.btnHidden = true;
        }
      }
    });

    alert.present();
  }

  up(item) {
    item.number++;
    item.priceTotal += item.price;
    this.updatePrice();
  }

  down(item) {
    if (item.number > 1) {
      item.number--;
      item.priceTotal -= item.price;
      this.updatePrice();
    }
  }

  updateMenu(item) {
    let alert = this.alertCtrl.create({});
    alert.setTitle(`Chỉnh sữa`);

    alert.setSubTitle(item.name);

    alert.addInput({
      type: "number",
      value: item.number,
      name: "number"
    });

    alert.addInput({
      type: "number",
      value: item.priceTotal,
      name: "price"
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
        item.description = data.description;
        if (parseInt(data.number) < 1) {
          data.number = 1;
        }

        item.priceTotal = parseInt(data.price);
        item.number = parseInt(data.number);
        this.arrFood.push(item);
        this.arrFood = Array.from(new Set(this.arrFood));
        this.updatePrice();
      }
    });

    alert.present();
  }

  editPhuPhi() {
    let alert = this.alertCtrl.create({});
    alert.setTitle(`Phụ phí`);

    alert.addInput({
      type: "number",
      value: "" + this.phuPhi,
      name: "phuPhi"
    });

    alert.addButton("Hủy");
    alert.addButton({
      text: "Ok",
      handler: data => {
        this.phuPhi = parseInt(data.phuPhi);
        this.updatePrice();
      }
    });

    alert.present();
  }

  editVAT() {
    let alert = this.alertCtrl.create({
      title: "VAT",
      inputs: [
        {

          name: 'vat',
          type: 'radio',
          label: '0%',
          value: '0'
        },
        {
          name: 'vat',
          type: 'radio',
          label: '5%',
          value: '0.05'
        },
        {
          name: 'vat',
          type: 'radio',
          label: '10%',
          value: '0.1',
          checked: true

        }
      ]
    });
    alert.setTitle(`Phụ phí`);

    alert.addButton("Hủy");
    alert.addButton({
      text: "Ok",
      handler: data => {
        console.log("data: ", data);
        this.vat = parseFloat(data);
        console.log(this.vat);
        this.updatePrice();
      }
    });

    alert.present();
  }

  saveBill() {
    let report: Array<any> = [];
    for (let i = 0; i < this.arrFood.length; i++) {
      let data = {
        id_food: this.arrFood[i].id,
        number: this.arrFood[i].number,
        price: this.arrFood[i].priceTotal,
        note: this.arrFood[i].description
      };
      report.push(data);
    }

    let data = {
      dataFoods: report,
      id_table: this.idTable,
      note: this.note ? this.note : ""
    };

    this.btnHidden = true;
    this.pushmenuservice.pushDetailBill(data).then(res => {
      console.log(res.id);
      this.pushToBill(res.id);
      this.navCtrl.pop({ animate: false });
    });
  }

  pushToBill(id_bill_detail) {
    let date = new Date();
    let data = {
      id_area: this.idArea,
      name: this.name,
      total: this.total,
      id_bill_detail: id_bill_detail,
      phu_phi: this.phuPhi,
      vat: this.vat,
      date: date,
      status: false
    };
    this.events.publish("infoABill", data);
    this.pushmenuservice.pushListBill(data).then(res => {});
  }
}
