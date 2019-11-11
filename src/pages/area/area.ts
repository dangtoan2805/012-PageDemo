import { Area } from "./../../model/Area";
import { ToGoPage } from "./../to-go/to-go";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";
import { BillPage } from "./../bill/bill";
import { OrderPage } from "./../order/order";
import { GetMenuService } from "../services/getmenu.service";
@Component({
  selector: "page-area",
  templateUrl: "area.html"
})
export class AreaPage {
  id: any;

  header: string;
  data: Array<any> = [];

  areaName: Array<Area> = [];

  //====================== Life Cycle ==========
  // constructor --> ionViewDidLoad --> ionViewWillEnter -->
  // ionViewDidEnter --> ionViewWillLeave --> ionViewDidLeave --> ionViewWillUnload
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private getMenuService: GetMenuService
  ) {
    this.getData();
  }

  ionViewDidLoad() {
    this.header = "Mang Về";
    //this.getMenu();
    //this.addData(this.arrListTable,"table");
  }
  getData() {
    /*
      - get list name area
    */
    this.getMenuService.getCollection("area").then(snapshot => {
      this.data = snapshot.docs;
      for (let i = 0; i < this.data.length; i++) {
        this.areaName.push(this.data[i].data());
        this.areaName[i].id = this.data[i].id;
      }
      console.log("Get Area: Success !");
    });
  }



  openInfo() {
    let alert = this.alertCtrl.create({});
    alert.setTitle(this.header);

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
            data: data,
            name: this.header
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

  goToGoPage(id) {
    this.navCtrl.push(
      ToGoPage,
      { data: this.areaName, item: id },
      { animate: false }
    );
    console.log(id);
  }

  /*
    - array test firebase add to firebase
  */
  arrMenuDrink = [
    {
      description: "",
      id_discount: "",
      id_menu: "LZleYHRHqvR30NjMAowg",
      img: "https://thucthan.com/media/2018/06/tra-dao/cach-lam-tra-dao.jpg",
      name: "Trà Đào",
      price: 30000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "LZleYHRHqvR30NjMAowg",
      img: "https://vnn-imgs-f.vgcloud.vn/2019/10/06/08/tra-sua.jpg",
      name: "Trà Sữa",
      price: 50000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "LZleYHRHqvR30NjMAowg",
      img: "https://img.adayroi.com/0/2015/11/21/1448080501301_6867418.jpg",
      name: "Bia 333",
      price: 30000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "LZleYHRHqvR30NjMAowg",
      img:
        "https://img.sosanhgia.com/images/500x0/336cc509349b45b5adb69a2f41c679ae/bia-heineken.jpeg",
      name: "Bia Hineken",
      price: 30000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    }
  ];

  arrMenuFood = [
    {
      description: "",
      id_discount: "",
      id_menu: "Vd8vg9K32VyxKMOmxAJT",
      img:
        "https://image-us.eva.vn/upload/3-2018/images/2018-09-07/canh-chua-avt-1536272450-658-width640height480_schema_article.jpg",
      name: "Canh chua",
      price: 60000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "Vd8vg9K32VyxKMOmxAJT",
      img:
        "https://ameovat.com/wp-content/uploads/2018/04/cach-lam-com-ga-xoi-mo-4-600x338.jpg",
      name: "Cơm gà",
      price: 15000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "Vd8vg9K32VyxKMOmxAJT",
      img:
        "http://2sao.vietnamnetjsc.vn/images/2018/01/09/13/14/cua-rang-me.jpg",
      name: "Cua rang me",
      price: 100000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "Vd8vg9K32VyxKMOmxAJT",
      img: "https://znews-photo.zadn.vn/w660/Uploaded/tmuitg/2018_03_21/5.jpg",
      name: "Gỏi cuốn",
      price: 30000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "Vd8vg9K32VyxKMOmxAJT",
      img:
        "https://www.iunauan.com/images/650x307/520x245/anh1-iunauan.com-lrarkj211349010.jpg",
      name: "Lòng heo",
      price: 30000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "Vd8vg9K32VyxKMOmxAJT",
      img:
        "https://massageishealthy.com/wp-content/uploads/2019/06/nhung-mon-ngon-tu-trung-ga-lam-mon-gi-ngon-nhat-thumb.jpg",
      name: "Trứng",
      price: 88000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "Vd8vg9K32VyxKMOmxAJT",
      img:
        "https://tourdulichdaolyson.com/view/at_nhung-mon-an-ngon-cua-nguoi-xu-quang_49f437417e80ff615e7652dbf8dbdd5d.jpg",
      name: "Mực hấp",
      price: 55000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "Vd8vg9K32VyxKMOmxAJT",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbe7kjJykk9Pm6Bt2NDJVvNAH0-Q_bE1d3UyejKegGqToe59uZOw&s",
      name: "Heo quay",
      price: 90000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    }
  ];

  arrmenuDessert = [
    {
      description: "",
      id_discount: "",
      id_menu: "zK9EoHYqBGulJehX0kj1",
      img:
        "https://sohanews.sohacdn.com/thumb_w/660/2016/photo-1-1479349348358-crop-1479349592099-1479366172741-3-62-303-546-crop-1479366204523.jpg",
      name: "Banh plan",
      price: 60000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "zK9EoHYqBGulJehX0kj1",
      img:
        "https://anh.24h.com.vn/upload/4-2017/images/2017-11-09/Mon-trang-mieng-va-do-ngot-an-toan-cho-benh-nhan-tieu-duong-1-1510213263-498-width650height382.jpg",
      name: "Kem",
      price: 82000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "zK9EoHYqBGulJehX0kj1",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq6bo6Ny7YhiQuyA-Zp-lBxBkQSUbh66WEyXMEmEC7hPoTVcMpYw&s",
      name: "Rau câu",
      price: 30000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "zK9EoHYqBGulJehX0kj1",
      img:
        "https://vtv1.mediacdn.vn/thumb_w/650/Uploaded/lehoa/2014_04_28/panacotta%20(8).jpg",
      name: "Panna cotta",
      price: 90000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    },
    {
      description: "",
      id_discount: "",
      id_menu: "zK9EoHYqBGulJehX0kj1",
      img: "http://duhocphap.com.vn/uploads/B%C3%A1nh%20tarte.jpg",
      name: "Goi trai cây",
      price: 60000,
      size: [
        {
          l: 0,
          s: 0,
          m: 0
        }
      ]
    }
  ];

  arrListTable = [
    {
      id_area: "9vzYdNpk03xv1TGMxnvv",
      name: "001",
      status: true,
      type: 2
    },
    {
      id_area: "9vzYdNpk03xv1TGMxnvv",
      name: "002",
      status: true,
      type: 2
    },
    {
      id_area: "9vzYdNpk03xv1TGMxnvv",
      name: "003",
      status: true,
      type: 2
    },
    {
      id_area: "9vzYdNpk03xv1TGMxnvv",
      name: "004",
      status: true,
      type: 2
    },
    {
      id_area: "9vzYdNpk03xv1TGMxnvv",
      name: "005",
      status: true,
      type: 2
    },
    {
      id_area: "9vzYdNpk03xv1TGMxnvv",
      name: "006",
      status: true,
      type: 2
    },
    {
      id_area: "NpFBudoyaFvP26USLl2t",
      name: "001",
      status: true,
      type: 1
    },
    {
      id_area: "NpFBudoyaFvP26USLl2t",
      name: "002",
      status: true,
      type: 1
    },
    {
      id_area: "NpFBudoyaFvP26USLl2t",
      name: "003",
      status: true,
      type: 2
    },
    {
      id_area: "NpFBudoyaFvP26USLl2t",
      name: "004",
      status: true,
      type: 2
    },
    {
      id_area: "NpFBudoyaFvP26USLl2t",
      name: "005",
      status: true,
      type: 1
    },
    {
      id_area: "NpFBudoyaFvP26USLl2t",
      name: "006",
      status: true,
      type: 2
    },
    {
      id_area: "NpFBudoyaFvP26USLl2t",
      name: "007",
      status: true,
      type: 1
    },
    {
      id_area: "QG5vQPDMO2B7UwncD5a3",
      name: "001",
      status: true,
      type: 1
    },

    {
      id_area: "QG5vQPDMO2B7UwncD5a3",
      name: "002",
      status: true,
      type: 1
    },
    {
      id_area: "QG5vQPDMO2B7UwncD5a3",
      name: "003",
      status: true,
      type: 1
    },
    {
      id_area: "QG5vQPDMO2B7UwncD5a3",
      name: "004",
      status: true,
      type: 1
    },
    {
      id_area: "QG5vQPDMO2B7UwncD5a3",
      name: "005",
      status: true,
      type: 2
    },
    {
      id_area: "QG5vQPDMO2B7UwncD5a3",
      name: "006",
      status: true,
      type: 2
    },
    {
      id_area: "QG5vQPDMO2B7UwncD5a3",
      name: "007",
      status: true,
      type: 1
    },
    {
      id_area: "QG5vQPDMO2B7UwncD5a3",
      name: "008",
      status: true,
      type: 2
    },
    {
      id_area: "QG5vQPDMO2B7UwncD5a3",
      name: "008",
      status: true,
      type: 2
    }
  ];

  /*
    - array add to firebase
    - collection
  */
  addData(array, colectionName) {
    for (let index in array)
      this.getMenuService.writeDataToFirebase(array[index], colectionName);
    console.log("Success!");
  }
}
