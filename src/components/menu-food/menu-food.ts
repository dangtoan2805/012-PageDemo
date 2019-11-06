import { Component } from '@angular/core';

/**
 * Generated class for the MenuFoodComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu-food',
  templateUrl: 'menu-food.html'
})
export class MenuFoodComponent {

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

  constructor() {
  }

}
