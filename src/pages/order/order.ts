import { GetMenuService } from "./../services/getmenu.service";
import { Food } from "./../../model/Food";
import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { BillPage } from "./../bill/bill";
import { MenuName } from "../../model/MenuName";
import { Events } from "ionic-angular";

@Component({
  selector: "page-order",
  templateUrl: "order.html"
})
export class OrderPage {
  name: string; // customer name od name table
  note: string; // ghi chú
  nameArea: string;
  idTable: string;
  menuNameSegment: string; // NgModelSegment
  arrFood: Array<Food> = []; // array info food add to bill
  menuName: Array<MenuName> = [];
  arrListFood: Array<Food> = []; // mảng lưu các món ăn có trong menu
  arrListFoodDefault: Array<Food> = [];
  idArea:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private getMenuService: GetMenuService,
    public alertCtrl: AlertController,
    public events: Events
  ) {
    this.getData();
    this.getUpdateData();
    this.arrListFoodDefault = this.arrListFood.filter(
      arrListFood => arrListFood.id_menu == this.menuName[0].id
    );
  }

  getData() {
    /*
      - get list name menu
    */
    this.getMenuService.getCollection("menu").then(snapshot => {
      let data = snapshot.docs;
      for (let i = 0; i < data.length; i++) {
        this.menuName.push(data[i].data());
        this.menuName[i].id = data[i].id;
      }
      this.menuNameSegment = this.menuName[0].id;
    });
    /*
      - get list menu
    */
    this.getMenuService.getCollection("food").then(snapshot => {
      let data = snapshot.docs;
      for (let i = 0; i < data.length; i++) {
        this.arrListFood.push(data[i].data());
        this.arrListFood[i].id = data[i].id;
      }
      this.arrListFoodDefault = this.arrListFood.filter(
        arrListFood => arrListFood.id_menu == this.menuName[0].id
      );
    });
  }

  ionViewDidLoad(){
    // nhận info từ area gửi sang
    // data: id_table, name, nameArea,note
    let data = this.navParams.get("data");
    if (data != null) {
      this.name = data.name;
      this.note = data.note;
      this.nameArea = data.nameArea;
      this.idTable = data.id_table;
      this.idArea = data.id_area;
      this.events.publish("orderpage_info", data);
    }

    // nhận info từ list-table gửi sang
    // data: id_table, name, nameArea,note
    let data2 = this.navParams.get("data_from_list_table");
    if (data2 != null) {
      this.name = data2.name;
      this.note = data2.note;
      this.nameArea = data2.nameArea;
      this.idTable = data2.id_table;
      this.idArea = data2.id_area;
      this.events.publish("orderpage_info_from_list_table", data2);
    }

    // nhận id_bill,nameArea từ list-table
    let info = this.navParams.get("info_id_bill");
    if(info != null){
      this.events.publish("orderpage_id_bill_from_list_table", info);
      this.nameArea = info.nameArea;
      this.name = info.name;
      this.idArea = info.id_area;
    }
  }

  goBack() {
    let alert = this.alertCtrl.create({});
    alert.setTitle(`Thoát !!!`);

    alert.setSubTitle(this.name);

    alert.addButton("Hủy");
    alert.addButton({
      text: "Ok",
      handler: () => {
        this.navCtrl.pop({ animate: false });
      }
    });

    alert.present();
  }

  goToBill() {
    this.navCtrl.push(BillPage, {id:this.idArea}, { animate: false });
  }

  /* 
    - Set giá trị menu
  */
  setMenuFood(id) {
    this.arrListFoodDefault = this.arrListFood.filter(arrListFood => arrListFood.id_menu == id)
    this.menuNameSegment = id;
  }
  /// getUpdateData
  getUpdateData() {
    console.log(this.navParams.get("data"));
    this.events.publish("updateBill", this.navParams.get("data"));
  }
}
