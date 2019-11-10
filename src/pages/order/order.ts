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
  name: string; // customer name
  note: string; // ghi chú
  menuNameSegment: string;// NgModelSegment
  data: Array<any>;// luu obj từ firebase
  arrFood: Array<Food> = []; // array info food add to bill
  menuName: Array<MenuName> = [];
  arrListFood:Array<Food> = []; // mảng lưu các món ăn có trong menu
  arrListFoodDefault:Array<Food> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private getMenuService: GetMenuService,
    public alertCtrl: AlertController,
    public events: Events
  ) {
    this.getData();
    this.arrListFoodDefault = this.arrListFood.filter(arrListFood => arrListFood.id_menu == this.menuName[0].id);
  }

  getData() {
    /*
      - get list name menu
    */
    this.getMenuService.getCollection("menu").then(snapshot => {
      this.data = snapshot.docs;
      for (let i = 0; i < this.data.length; i++) {
        this.menuName.push(this.data[i].data());
        this.menuName[i].id = this.data[i].id;
      }
      this.menuNameSegment = this.menuName[0].id;
    });
    /*
      - get list menu
    */
    this.getMenuService.getListFood().then(snapshot => {
      this.data = snapshot.docs;
      for (let i = 0; i < this.data.length; i++) {
        this.arrListFood.push(this.data[i].data());
        this.arrListFood[i].id = this.data[i].id;
      }
      this.arrListFoodDefault = this.arrListFood.filter(arrListFood => arrListFood.id_menu == this.menuName[0].id);
    });
  }

 
  ionViewDidLoad() {
    this.getNote();
   
  }

  goBack() {
    let alert = this.alertCtrl.create({});
    alert.setTitle(`Hủy Thực Đơn !!!`);

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

  ionViewWillEnter() {}

  // nhận info từ alert gửi sang: tên khách hàng, ghi chú
  getNote() {
    let data = this.navParams.get("data");
    this.name = data.name;
    this.note = data.note;
  }

  goToBill() {
    this.navCtrl.push(BillPage, {}, { animate: false });
  }

  /* 
    - Set giá trị menu
  */
  setMenuFood(id) {
    this.events.publish("listFoodAMenu",this.arrListFood.filter(arrListFood => arrListFood.id_menu == id)); 
    this.menuNameSegment = id;
    // }
  }
}
