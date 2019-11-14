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
import { Printer, PrintOptions } from "@ionic-native/printer";
import { GetMenuService } from "../../pages/services/getmenu.service";
import { PushMenuService } from "../../pages/services/pushmenu.service";
import { UpdateMenuService } from "../../pages/services/updatemenu.service";

@Component({
  selector: "detail-bill",
  templateUrl: "detail-bill.html"
})
export class DetailBillComponent {
  @Input() name: string; // Tên người đặt bill or tên bàn
  @Input() note: string; // Ghi chú bill
  @Input() nameArea: string; // Tên khu vực (Mang về, Tầng 1, ...)
  @Input() idTable: string; // id: bàn
  arrFood: Array<FoodTemp> = []; // Mảng các món ăn thêm vào bill
  tamTinh: number = 0;
  phuPhi: number = 0;
  vat: number = 0;
  total: number = 0;
  btnSaveHidden: boolean = true; // set status button lưu
  btnTTHidden: boolean = true;
  updateData: any;
  id;
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private getmenuservice: GetMenuService,
    private pushmenuservice: PushMenuService,
    private updatemenuservice: UpdateMenuService,
    private printer: Printer
  ) {
    this.getEventData();
  }
  getEventData() {
    this.events.subscribe("updateBill", update => {
      console.log(update);
      this.name = update.name;
      this.note = update.note;
    });
    // get 1 món ăn dc đặt
    // send to: MenuFoodComponent
    this.events.subscribe("menufood_infoAFood", data => {
      this.addToBill(data);
    });

    // get thông tin 1 bill
    // send to: ListBillsComponent
    this.events.subscribe("bill_infoABill", res => {
      this.arrFood = new Array();
      // get detail_bill
      this.getmenuservice
        .getCollectionById("bill_detail", res.id_bill_detail)
        .then(snapshot => {
          console.log(snapshot.id);

          let dataFood: Array<any> = [];
          let data = snapshot.data();
          // console.log("detailBill ", data);
          dataFood.push(data.dataFoods); // mang chưa các món ăn
          for (let i in dataFood[0]) {
            this.showBill(dataFood[0][i]);
          }
          this.vat = res.vat;
          this.phuPhi = res.phu_phi;
          this.name = res.name;
          this.note = res.note;
          if (res.status == true) {
            this.btnSaveHidden = true;
            this.btnTTHidden = true;
          }
          this.updatePrice();
        });
    });

    this.events.subscribe("bill_name", res => {
      this.nameArea = res;
    });
    this.events.subscribe("listbill_infoABill", bill => {
      this.updateData = {
        id_table: bill.id_table,
        name: bill.name,
        total: bill.total,
        id_bill_detail: bill.id_bill_detail,
        phu_phi: bill.phu_phi,
        vat: bill.vat,
        date: bill.date,
        status: true,
        note: bill.note
      };

      this.id = bill.id;
    });
  }

  showBill(data) {
    this.getmenuservice.getCollectionById("food", data.id_food).then(res => {
      let food = res.data();
      let dataFood = {
        id: data.id_food,
        number: data.number,
        note: data.note,
        name: food.name,
        price: data.price
      };
      this.addToBill(dataFood);
    });
  }

  addToBill(data) {
    // Tạo 1 bản sao để khi thay đổi giá trị food không thay đổi
    // item = {id,number,name,price,note}
    let item = Object.assign({}, data);

    // xét xem món này đã có trong bill hay chưa
    // có tăng số lượng món, không add mới(index = -1)
    let index = this.arrFood.findIndex(arrFood => arrFood.id == item.id);

    if (index != -1) {
      this.arrFood[index].number = this.arrFood[index].number + item.number;
      this.arrFood[index].priceTotal += item.number * item.price;
      this.arrFood[index].note += item.note != "" ? " -" + item.note : "";
    } else {
      this.arrFood.push(item);
      this.arrFood[this.arrFood.length - 1].priceTotal =
        item.price * item.number;
    }
    this.updatePrice();
    this.btnSaveHidden = false;
    this.btnTTHidden = false;
  }

  updatePrice() {
    this.tamTinh = 0;
    for (let item in this.arrFood) {
      this.tamTinh += this.arrFood[item].priceTotal;
    }
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
          this.btnSaveHidden = true;
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
    alert.setTitle(`Chỉnh sửa`);

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
        if (item.priceTotal == parseInt(data.price)) {
          item.priceTotal = data.number * item.price;
        } else {
          item.priceTotal = parseInt(data.price);
        }
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
          name: "vat",
          type: "radio",
          label: "0%",
          value: "0"
        },
        {
          name: "vat",
          type: "radio",
          label: "5%",
          value: "0.05"
        },
        {
          name: "vat",
          type: "radio",
          label: "10%",
          value: "0.1",
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

  // Lưu thông tin bill
  saveBill() {
    // save to bill_detail
    let arrFoodOrder: Array<any> = [];
    for (let i = 0; i < this.arrFood.length; i++) {
      let data = {
        id_food: this.arrFood[i].id,
        number: this.arrFood[i].number,
        price: this.arrFood[i].priceTotal,
        note: this.arrFood[i].note
      };
      arrFoodOrder.push(data);
    }

    this.pushmenuservice.pushDetailBill(arrFoodOrder).then(res => {
      let idBillDetail = res.id;
      // save to bill
      this.pushToBill(idBillDetail);

      this.btnSaveHidden = true;
    });
  }

  pushToBill(id_bill_detail) {
    let date = new Date();
    let data = {
      id_table: this.idTable,
      name: this.name,
      total: this.total,
      id_bill_detail: id_bill_detail,
      phu_phi: this.phuPhi,
      vat: this.vat,
      date: date,
      status: false,
      note: this.note != null ? this.note : ""
    };
    this.events.publish("infoABill", data);
    this.pushmenuservice.pushListBill(data).then(res => {
      this.navCtrl.pop({ animate: false });
    });
  }

  printBill() {
    this.printer.isAvailable().then(
      function() {
        let options: PrintOptions = {
          name: "MyDocument",

          duplex: true,
          landscape: true,
          grayscale: true
        };
        this.printer.print("demo", options).then(
          function() {
            alert("printing done successfully !");
          },
          function() {
            alert("Error while printing !");
          }
        );
      },
      function() {
        alert("Error : printing is unavailable on your device ");
      }
    );
  }
  payBill() {
    console.log(this.updateData);

    this.updatemenuservice.updateMenu(this.id, this.updateData).then(res => {
      this.navCtrl.pop({ animate: false });
    });
  }
}
