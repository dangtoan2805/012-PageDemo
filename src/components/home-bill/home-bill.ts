import { Component } from '@angular/core';

/**
 * Generated class for the HomeBillComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-bill',
  templateUrl: 'home-bill.html'
})
export class HomeBillComponent {

  text: string;

  data: Array<any> = [
    { id: 0, name: "Anh Hai", price: 5000000 },
    { id: 0, name: "Anh Hai", price: 5000000 },
    { id: 0, name: "Anh Hai", price: 5000000 },
    { id: 0, name: "Anh Hai", price: 5000000 },
    { id: 0, name: "Anh Hai", price: 5000000 },
    { id: 0, name: "Anh Hai", price: 5000000 },
    { id: 0, name: "Anh Hai", price: 5000000 }
  ];

  constructor() {
    console.log('Hello HomeBillComponent Component');
    this.text = 'Hello World';
  }

}
