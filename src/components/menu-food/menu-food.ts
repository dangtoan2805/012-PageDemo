import { Food } from "./../../model/Food";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";
import { Events } from "ionic-angular";
@Component({
  selector: "menu-food",
  templateUrl: "menu-food.html"
})
export class MenuFoodComponent {
  @Input() menu: Array<Food>; // menu được nhận vào
  @Output() food = new EventEmitter<Food>(); // info a food
  @Output() note = new EventEmitter<any>(); // 2 biến number of food and note

  defaultImage = "../../assets/imgs/default-img.JPG";

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    events.subscribe("listFoodAMenu", ref => {
      this.menu = ref;

    });
  }

  ionViewWillEnter() {}

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
        item.description = data.note;
        if(parseInt(data.number)<1){
          data.number = 1;
        }
        item.number = parseInt(data.number);
        /*
          - create event, send data(a Food) to bill-detail 
        */
        this.events.publish("infoAFood", item);
      }
    });

    alert.present();
  }
}
