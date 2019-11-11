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
  arrFood: Array<Food> = [];
  tamTinh: number = 0;
  phuPhi: number = 0;
  vat: number = 0;
  total: number = 0;
  btnHidden: boolean = true;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private getmenuservice: GetMenuService,
    private pushmenuservice: PushMenuService
  ) {
    this.getEventData();
    // events.subscribe("data", dataTable => {
    //   console.log(dataTable);
    //   this.idTable = dataTable.id;
    //   this.nameArea = dataTable.nameFloor;
    // });
    // events.subscribe("name", name => {
    //   console.log(name);
    //   this.nameArea = name;
    // });
    // events.subscribe("infoAFood", food => {
    //   this.addToBill(food);
    // });
    // events.subscribe("updateBill", update => {
    //   console.log(update);
    //   (this.name = update.name),
    //     (this.note = update.note),
    //     (this.arrFood = update.arrFood);
    // });
  }
  getEventData() {
    // this.getmenuservice.getListFood().then(snapshot => {
    //   let data = snapshot.docs;
    //   for (let i = 0; i < data.length; i++) {
    //     this.idFood.push(data[i].id);
    //     console.log(this.idFood);
    //   }
    // });
    this.events.subscribe("data", dataTable => {
      console.log(dataTable);
      this.idTable = dataTable.id;
      this.nameArea = dataTable.nameFloor;
    });
    this.events.subscribe("name", name => {
      console.log(name);
      this.nameHome = name;
    });
    this.events.subscribe("infoAFood", food => {
      this.addToBill(food);
    });
    this.events.subscribe("updateBill", update => {
      console.log(update);
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
    } else {
      this.arrFood.push(item);
    }
    this.updatePrice();
    this.btnHidden = false;
  }

  updatePrice() {
    this.tamTinh = 0;
    for (let item in this.arrFood) {
      this.tamTinh += this.arrFood[item].price * this.arrFood[item].number;
    }
    this.total = this.tamTinh + this.vat + this.phuPhi;
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
          console.log(this.arrFood.length);
        }
      }
    });

    alert.present();
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
        if (parseInt(data.number) < 1) {
          data.number = 1;
        }
        item.number = parseInt(data.number);
        this.arrFood.push(item);
        this.arrFood = Array.from(new Set(this.arrFood));
        this.updatePrice();
      }
    });

    alert.present();
  }

  saveBill() {
    let date = new Date();
    let data = {
      id: this.idTable,
      name: this.name,
      price: this.total,

      date: date
    };
    let report: Array<any> = [];
    for (let i = 0; i < this.arrFood.length; i++) {
      let data = {
        id_food: this.arrFood[i].id,
        number: this.arrFood[i].number,
        price: this.arrFood[i].price * this.arrFood[i].number
      };

      report.push(data);
    }
    let detailBill = {
      dataFoods: report
    };

    this.events.publish("infoABill", data);

    this.btnHidden = true;
    this.pushmenuservice.pushDetailBill(detailBill).then(res => {
      this.navCtrl.pop({ animate: false });
    });
    this.pushmenuservice.pushListBill(data).then(res => {});
  }
}
