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
  id; infoTable;
  idBill: string;
  idBillDetail: string;
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
    // get 1 món ăn dc đặt
    // send to: MenuFoodComponent
    this.events.subscribe("menufood_infoAFood", data => {
      this.addToBill(data);
      this.btnSaveHidden = false;
    });

    // get thông tin 1 bill
    // send to: ListBillsComponent
    this.events.subscribe("bill_infoABill", (res, nameArea) => {
      this.arrFood = new Array();
      // get detail_bill
      this.getmenuservice
        .getCollectionById("bill_detail", res.id_bill_detail)
        .then(snapshot => {
          console.log(snapshot.data(), snapshot.id);

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
      this.nameArea = nameArea;
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

    // get info table
    this.events.subscribe("orderpage_info", ref => {
      this.infoTable = ref;
    })

    // get info table
    this.events.subscribe("orderpage_info_from_list_table", ref => {
      this.infoTable = ref;
    })

    // get id bill
    this.events.subscribe("orderpage_id_bill_from_list_table", ref => {
      this.getBill(ref.id_bill);
      this.idBill = ref.id_bill;
      this.nameArea = ref.nameArea;
      this.btnSaveHidden = true;
    })
  }

  ngOnDestroy() {
    this.events.unsubscribe("orderpage_info");
    this.events.unsubscribe("updateBill");
    this.events.unsubscribe("menufood_infoAFood");
    this.events.unsubscribe("bill_infoABill");
    this.events.unsubscribe("listbill_infoABill");
    this.events.unsubscribe("orderpage_info_from_list_table");
    this.events.unsubscribe("orderpage_id_bill_from_list_table");
  }

  showBill(data) {
    this.getmenuservice.getCollectionById("food", data.id_food).then(res => {
      let food = res.data();
      let dataFood = {
        id: data.id_food,
        number: data.number,
        note: data.note,
        name: food.name,
        price: food.price
      };
      this.addToBill(dataFood);
    });
  }

  addToBill(data) {
    console.log("! mon" + data.price);
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
        this.btnSaveHidden = false;
      }
    });
   
    alert.present();
  }

  up(item) {
    console.log("price item", item.price);
    item.number++;
    item.priceTotal += item.price;
    this.updatePrice();
    this.btnSaveHidden = false;
  }

  down(item) {
    if (item.number > 1) {
      item.number--;
      item.priceTotal -= item.price;
      this.updatePrice();
    }
    this.btnSaveHidden = false;
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
      value: item.note,
      name: "note"
    });

    alert.addButton("Hủy");
    alert.addButton({
      text: "Ok",
      handler: data => {
        item.note = data.note;
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
        this.btnSaveHidden = false;
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
    this.btnSaveHidden = false;
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
    this.btnSaveHidden = false;
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
    if (this.idBill == null) {
      console.log("new detail bill");
      this.pushmenuservice.pushDetailBill(arrFoodOrder).then(res => {
        let idBillDetail = res.id;
        // save to bill
        this.pushToBill(idBillDetail);
      });
    }
    // bill đã tồn tại
    else {
      this.updatemenuservice.updateBillDetailById("bill_detail", this.idBillDetail, arrFoodOrder).then(res => {
        // save to bill
        console.log("idBillDetail" + this.idBillDetail);
        this.pushToBill(this.idBillDetail);
      });
    }
    this.btnSaveHidden = true;
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

    if (this.idBill == null) {
      this.pushmenuservice.pushListBill(data).then(res => {
        this.navCtrl.pop({ animate: false });
        this.updateTableStatus(res.id);
      });
    }
    else {
      this.updatemenuservice.updateCollectionById("bill", this.idBill, data).then(res => {
        this.navCtrl.pop({ animate: false });
      });
    }
  }

  printBill() {
    this.printer.isAvailable().then(
      function () {
        let options: PrintOptions = {
          name: "MyDocument",

          duplex: true,
          landscape: true,
          grayscale: true
        };
        this.printer.print("demo", options).then(
          function () {
            alert("printing done successfully !");
          },
          function () {
            alert("Error while printing !");
          }
        );
      },
      function () {
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

  // set trang thai ban => false
  updateTableStatus(id_bill) {
    if (this.infoTable == null) return;
    if (this.infoTable.id_area != "id_gohome") {
      console.log(this.infoTable.id_area);
      let data = {
        id_area: this.infoTable.id_area,
        name: this.infoTable.name,
        status: false,
        type: this.infoTable.type,
        id_bill: id_bill
      }
      // set status table
      this.updatemenuservice.updateCollectionById("table", this.idTable, data);
    }
  }

  // get data bill by id from firebase
  // input : id bill
  getBill(id) {
    console.log("id " + id);
    this.getmenuservice.getCollectionById("bill", id).then(res => {
      console.log(res.data());
      let data = res.data();
      this.getBillDetail(data.id_bill_detail);
      this.name = data.name;
      this.note = data.note;
      this.idTable = data.id_table;
      this.phuPhi = data.phu_phi;
      this.vat = data.vat;
      console.log(this.vat);
    })
  }

  // get data bill detail by id from firebase
  // input : id bill detail
  getBillDetail(id) {
    this.getmenuservice.getCollectionById('bill_detail', id).then(res => {
      let infoBillDetail = res.data().dataFoods;
      this.idBillDetail = res.id;
      for (let i in infoBillDetail) {
        this.showBill(infoBillDetail[i]);
      }
    })
  }
}
