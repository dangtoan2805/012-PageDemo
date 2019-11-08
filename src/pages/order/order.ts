import { MenuFirebase } from './../../model/MenuFirebase';
import { GetMenuService } from './../services/getmenu.service';
import { Food } from './../../model/Food';
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { BillPage } from "./../bill/bill";

@Component({
  selector: "page-order",
  templateUrl: "order.html"
})
export class OrderPage {

  name: string; // ten người đặt
  note: string; // ghi chú
  index: number = 0; // default menu 1
  tamTinh:number = 0;
  phuPhi:number = 0;
  vat:number = 0;
  total:number = 0;

  data:Array<any>;
  item;

  arrFood:Array<Food> = []; // array info food add to bill

  menu: Array<any> = [
    {
      id: 1,
      name: "Menu 1",
      menuFood: [
        {
          id: 1,
          name: "Gà1",
          imageUrl: "../../assets/imgs/anh3.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1,
        },
        {
          id: 2,
          name: "Gà1",
          imageUrl: "../../assets/imgs/anh3.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1,
        },
        {
          id: 3,
          name: "Gà1",
          imageUrl: "../../assets/imgs/anh3.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1,
        }]
    },
    {
      id: 2,
      name: "Menu 2",
      menuFood: [
        {
          id: 4,
          name: "Ech Cafe",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1,
        },
        {
          id: 5,
          name: "Gà2",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1
        },
        {
          id: 6,
          name: "Gà2",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1
        }]
    },
    {
      id: 3,
      name: "Menu 3",
      menuFood: [
        {
          id: 7,
          name: "Cafe",
          imageUrl: "../../assets/imgs/anh3.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1
        },
        {
          id: 8,
          name: "Gà",
          imageUrl: "../../assets/imgs/anh3.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1
        },
        {
          id: 9,
          name: "Gà",
          imageUrl: "../../assets/imgs/anh3.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1
        }]
    },
    {
      id: 4,
      name: "Menu 4",
      menuFood: [
        {
          id: 10,
          name: "Gà ",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1
        },
        {
          id: 11,
          name: "Gà",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1
        },
        {
          id: 12,
          name: "Gà",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1,
        }]
    },
    {
      id: 5,
      name: "Menu 5",
      menuFood: [
        {
          id: 13,
          name: "Gà Tôm Cá Cua Heo Bo Ech Cafe",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1,
        },
        {
          id: 14,
          name: "Gà",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1,
        },
        {
          id: 15,
          name: "Gà",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1,
        }]
    },
    {
      id: 6,
      name: "Menu 6",
      menuFood: [
        {
          id: 16,
          name: "Gà Tôm Cá Cua Heo Bo Ech Cafe",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1,
        },
        {
          id: 17,
          name: "Gà",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1,
        },
        {
          id: 18,
          name: "Gà",
          imageUrl: "../../assets/imgs/anh2.jpg",
          description: "",
          size: "L",
          priceDefault: 12000,
          number:1,
        }]
    },
  ]

  menuFirebase:Array<MenuFirebase> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private getMenuService: GetMenuService) {
    this.getData();
  }

  getData(){
    this.getMenuService.getMenu("menu").then(snapshot => {
      console.log(snapshot.docs);
      this.data = snapshot.docs;
      for(let i = 0;i<this.data.length;i++){
        this.menuFirebase.push(this.data[i].data());
      }
      console.log(this.menuFirebase);
      this.item = this.menuFirebase[this.index].menufood;
    
    });
  }

  ionViewDidLoad() {
    this.getNote();
  }

  goBack() {
    this.navCtrl.pop({ animate: false });
  }

  ionViewWillEnter() { }

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
  setIndexMenu(id) {
    console.log(id);
    if ( this.index != id-1) {
      this.index = id-1;
      this.item = this.menuFirebase[this.index].menufood;
      
    }
  } 
}
