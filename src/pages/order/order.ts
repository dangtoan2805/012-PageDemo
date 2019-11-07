import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { BillPage } from "./../bill/bill";

@Component({
  selector: "page-order",
  templateUrl: "order.html"
})
export class OrderPage {
  menuId: Array<any> = [];
  menuFood: Array<any> = [];
  menuNote: any;
  tamtinh: number = 0;
  vat: number = 0;
  total: number = 0;
  id: any;
  name: any;
  note: any;
  data: any;
  footer: any;
  menu: Array<any> = [
    {
      id: 11,
      name: "Menu 1",
      menuFood: [
        {
          id: 2,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Gà Tôm Cá Cua Heo Bo Ech Cafe",
          number: 1,
          default: 120000,
          note: ""
        },
        {
          id: 3,
          price: 120000,
          imageUrl: "../../assets/imgs/and3.jpg",
          name: "Cafe Đen",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 4,
          price: 120000,
          imageUrl: "../../assets/imgs/anh1.jpeg",
          name: "Tôm Nướng",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 5,
          price: 120000,
          imageUrl: "../../assets/imgs/anh.jpg",
          name: "Anh 2",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 6,
          price: 120000,
          imageUrl: "../../assets/imgs/an2.jpg",
          name: "Anh 3",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 7,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 4",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 8,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 1",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 9,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 2",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 10,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 3",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 11,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 4",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 12,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 1",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 13,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 2",
          default: 120000,
          number: 1,
          note: ""
        }
      ]
    },
    {
      id: 2,
      name: "Menu 2",
      menuFood: [
        {
          id: 0,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Gà Chiên Nước Mắm",
          number: 1,
          default: 100000,
          note: ""
        },
        {
          id: 1,
          price: 100000,
          imageUrl: "../../assets/imgs/anh1.jpeg",
          name: "Cafe Sữa",
          number: 1,
          default: 120000,
          note: ""
        },
        {
          id: 2,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Lau tom ca cua ga bo",
          number: 1,
          default: 120000,
          note: ""
        },
        {
          id: 3,
          price: 120000,
          imageUrl: "../../assets/imgs/and3.jpg",
          name: "Cafe Đen",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 4,
          price: 120000,
          imageUrl: "../../assets/imgs/anh1.jpeg",
          name: "Tôm Nướng",
          default: 120000,
          number: 1
        },
        {
          id: 5,
          price: 120000,
          imageUrl: "../../assets/imgs/anh.jpg",
          name: "Bia Tiger",
          default: 80000,
          number: 1,
          note: ""
        },

        {
          id: 13,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 2",
          default: 120000,
          number: 1
        }
      ]
    },
    {
      id: 3,
      name: "Menu 3",
      menuFood: [
        {
          id: 6,
          price: 120000,
          imageUrl: "../../assets/imgs/an2.jpg",
          name: "Anh 3",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 7,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 4",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 8,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 1",
          default: 120000,
          number: 1,
          note: ""
        },
        {
          id: 9,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 2",
          default: 120000,
          number: 1,
          note: ""
        }
      ]
    },
    {
      id: 4,
      name: "Menu 4",
      menuFood: [
        {
          id: 0,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Gà Chiên Nước Mắm",
          number: 1,
          default: 100000
        },
        {
          id: 1,
          price: 100000,
          imageUrl: "../../assets/imgs/anh1.jpeg",
          name: "Cafe Sữa",
          number: 1,
          default: 120000
        },
        {
          id: 2,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Lau tom ca cua ga bo",
          number: 1,
          default: 120000
        },
        {
          id: 3,
          price: 120000,
          imageUrl: "../../assets/imgs/and3.jpg",
          name: "Cafe Đen",
          default: 120000,
          number: 1
        },
        {
          id: 4,
          price: 120000,
          imageUrl: "../../assets/imgs/anh1.jpeg",
          name: "Tôm Nướng",
          default: 120000,
          number: 1
        },
        {
          id: 5,
          price: 120000,
          imageUrl: "../../assets/imgs/anh.jpg",
          name: "Bia Tiger",
          default: 80000,
          number: 1
        },
        {
          id: 6,
          price: 120000,
          imageUrl: "../../assets/imgs/an2.jpg",
          name: "Anh 3",
          default: 120000,
          number: 1
        },
        {
          id: 7,
          price: 120000,
          imageUrl: "../../assets/imgs/anh2.jpg",
          name: "Anh 4",
          default: 120000,
          number: 1
        }
      ]
    },
    {
      id: 5,
      name: "Menu 5"
    },
    {
      id: 6,
      name: "Menu 6"
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.footer = "1";
  }

  ionViewDidLoad() {
    this.getNote();
  }
  goBack() {
    this.navCtrl.pop({ animate: false });
  }

  ionViewWillEnter() {
    this.footer = "1";
  }

  getNote() {
    this.data = this.navParams.get("data");
    this.name = this.data.name;
    this.note = this.data.note;
  }

  goToBill() {
    console.log("aaaaa");

    this.navCtrl.push(BillPage, {}, { animate: false });
  }

  changeMenu(item, id) {
    console.log(item, id);
    this.menuId = item;
    this.id = id;
  }

  getMenuNote(note) {
    this.menuNote = note;
    console.log(this.menuNote);
  }
  getMenufood(item) {
    console.log(item);
    item.number = this.menuNote.number;
    item.note = this.menuNote.note;
    item.price = this.menuNote.number * item.price;
    this.menuFood.push(item);
    this.menuFood = Array.from(new Set(this.menuFood));
    this.sendMenu();
    console.log(this.menuFood);
  }

  sendMenu() {
    if ((this.tamtinh = this.menuFood.reduce((a, b) => a + b.price, 0))) {
      this.vat = 0.1 * this.tamtinh;
      this.total = this.vat + this.tamtinh;
    }
    if ((this.tamtinh = this.menuFood.reduce((a, b) => a - b.price * -1, 0))) {
      this.vat = 0.1 * this.tamtinh;
      this.total = this.vat + this.tamtinh;
    }
    console.log(this.tamtinh);
  }
}
