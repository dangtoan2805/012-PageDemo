import { Component, Input, Output, EventEmitter } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";
@Component({
  selector: "menu-food",
  templateUrl: "menu-food.html"
})
export class MenuFoodComponent {
  @Input("menu") menu: Array<any>;
  @Output("food") food = new EventEmitter<any>();
  @Output("note") note = new EventEmitter<any>();

  defaultImage = "../../assets/imgs/default-img.JPG";
  // array test
  foodRes = [
    {
      id: 0,
      price: 120000,
      imageUrl: "../../assets/imgs/anh2.jpg",
      name: "Gà Chiên Nước Mắm",
      number: 1,
      default: 120000
    },
    {
      id: 1,
      price: 120000,
      imageUrl: "../../assets/imgs/anh1.jpeg",
      name: "Cafe Sữa",
      number: 1,
      default: 120000
    },
    {
      id: 2,
      price: 120000,
      imageUrl: "../../assets/imgs/anh2.jpg",
      name: "Gà Tôm Cá Cua Heo Bo Ech Cafe",
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
      name: "Anh 2",
      default: 120000,
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
    },
    {
      id: 8,
      price: 120000,
      imageUrl: "../../assets/imgs/anh2.jpg",
      name: "Anh 1",
      default: 120000,
      number: 1
    },
    {
      id: 9,
      price: 120000,
      imageUrl: "../../assets/imgs/anh2.jpg",
      name: "Anh 2",
      default: 120000,
      number: 1
    },
    {
      id: 10,
      price: 120000,
      imageUrl: "../../assets/imgs/anh2.jpg",
      name: "Anh 3",
      default: 120000,
      number: 1
    },
    {
      id: 11,
      price: 120000,
      imageUrl: "../../assets/imgs/anh2.jpg",
      name: "Anh 4",
      default: 120000,
      number: 1
    },
    {
      id: 12,
      price: 120000,
      imageUrl: "../../assets/imgs/anh2.jpg",
      name: "Anh 1",
      default: 120000,
      number: 1
    },
    {
      id: 13,
      price: 120000,
      imageUrl: "../../assets/imgs/anh2.jpg",
      name: "Anh 2",
      default: 120000,
      number: 1
    },
    {
      id: 14,
      price: 120000,
      imageUrl: "../../assets/imgs/anh2.jpg",
      name: "Anh 3",
      default: 120000,
      number: 1
    },
    {
      id: 15,
      price: 120000,
      imageUrl: "../../assets/imgs/and3.jpg",
      name: "Anh 4",
      default: 120000,
      number: 1
    }
  ];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}
  ionViewWillEnter() {}
  chooseMenu(item) {
    console.log(item);
  }
  openInfo(item) {
    let alert = this.alertCtrl.create({});
    alert.setTitle(`Mang Về`);

    alert.setSubTitle(item.name);

    alert.addInput({
      type: "number",
      placeholder: "Số Lượng",
      name: "number",
      value: "1",
      label: "Số Lượng"
    });

    alert.addInput({
      type: "textarea",
      placeholder: "Ghi Chú",
      name: "note"
    });

    alert.addButton("Hủy");
    alert.addButton({
      text: "Ok",
      handler: data => {
        console.log("Checkbox data:", data);
        console.log(item);
        this.note.emit(data);
        this.food.emit(item);
      }
    });

    alert.present();
  }
}
