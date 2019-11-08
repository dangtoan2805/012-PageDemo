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
  index: number = 1; // default menu 1
  tamTinh:number = 0;
  phuPhi:number = 0;
  vat:number = 0;
  total:number = 0;

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

  // getMenuNote(note) {
  //   this.menuNote = note;
  //   console.log(this.menuNote);
  // }

  // getMenufood(item) {
  //   console.log(item);
  //   item.number = this.menuNote.number;
  //   item.note = this.menuNote.note;
  //   item.price = this.menuNote.number * item.price;
  //   this.menuFood.push(item);
  //   this.menuFood = Array.from(new Set(this.menuFood));
  //   this.sendMenu();
  //   console.log(this.menuFood);
  // }

  // sendMenu() {
  //   if ((this.tamtinh = this.menuFood.reduce((a, b) => a + b.price, 0))) {
  //     this.vat = 0.1 * this.tamtinh;
  //     this.total = this.vat + this.tamtinh;
  //   }
  //   if ((this.tamtinh = this.menuFood.reduce((a, b) => a - b.price * -1, 0))) {
  //     this.vat = 0.1 * this.tamtinh;
  //     this.total = this.vat + this.tamtinh;
  //   }
  //   console.log(this.tamtinh);
  // }

  /* 
    - Set giá trị menu
  */
  setIndexMenu(id) {
    if ( this.index != id) {
      this.index = id;
     // console.log(id);
    }
  }

  /*
    - Trả về menu theo vị trí trong array, mặc định là 0,1,2,3,4 
   tương ứng với menu 1 2 3 4 5
  */
  getMenu() {
    let index = this.menu.findIndex(menuFood => menuFood.id == this.index);
    return this.menu[index].menuFood;
  }

  /*
    - Get info of a food on "@Output() food:Array<Food>" in menu-food 
  */
  getMenuFood(item){
    let index = this.arrFood.findIndex(arrFood => arrFood.id == item.id);
    if(index != -1){
      item.number++;
      item.price = item.amount * item.priceDefault;
      this.arrFood[index] = item;
    }
    else{
      item.price = item.amount * item.priceDefault;
      this.arrFood.push(item);
    }

    this.tamTinh = this.arrFood.reduce((a, b) => a + b.price, 0);
  }
}
