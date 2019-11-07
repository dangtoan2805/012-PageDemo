import { ToGoPage } from "./../to-go/to-go";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";
import { HomeInfoPage } from "../popups/home-info/home-info";
import { BillPage } from "./../bill/bill";
import { OrderPage } from "./../order/order";

@Component({
  selector: "page-area",
  templateUrl: "area.html"
})
export class AreaPage {
  id: any;
  footer: string;
  header: string;
  items: Array<any>;
  bill: Array<any> = [];
  bills: any = "";
  data: any;

  tang: Array<any> = [
    {
      id: 1,
      name: "Tầng 1"
    },
    {
      id: 2,
      name: "Tầng 2"
    },
    {
      id: 3,
      name: "Tầng 3"
    },
    {
      id: 4,
      name: "Tầng 4"
    },
    {
      id: 5,
      name: "Tầng 5"
    },
    {
      id: 6,
      name: "Tầng 6"
    }
  ];

  menu: Array<any> = [
    {
      id: 1,
      name: "Menu 1"
    },
    {
      id: 2,
      name: "Menu 2"
    },
    {
      id: 3,
      name: "Menu 3"
    },
    {
      id: 4,
      name: "Menu 4"
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
  //====================== Life Cycle ==========
  // constructor --> ionViewDidLoad --> ionViewWillEnter -->
  // ionViewDidEnter --> ionViewWillLeave --> ionViewDidLeave --> ionViewWillUnload
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AreaPage");
  }
  ionViewWillEnter() {
    console.log("ionViewWillEnter AreaPage");
    this.header = "Mang Về";
    this.footer = "";
  }

  // openInfo() {
  //   let modal = this.modalCtrl.create(HomeInfoPage);
  //   modal.present();
  // }
  openInfo() {
    let alert = this.alertCtrl.create({});
    alert.setTitle("Mang Về");

    alert.addInput({
      type: "input",
      placeholder: "Tên Khách",
      name: "name"
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
        this.navCtrl.push(
          OrderPage,
          {
            data: data
          },
          { animate: false }
        );
      }
    });

    alert.present();
  }

  goToBill() {
    this.navCtrl.push(BillPage, {}, { animate: false });
  }

  gotomenu(event) {
    // console.log(event.value);
  }

  goToGoPage(id) {
    this.navCtrl.push(ToGoPage, { item: id }, { animate: false });
    console.log(id);
  }
}
