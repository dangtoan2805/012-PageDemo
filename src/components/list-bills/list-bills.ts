import { Component } from '@angular/core';

/**
 * Generated class for the ListBillsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list-bills',
  templateUrl: 'list-bills.html'
})
export class ListBillsComponent {

  text: string;

  constructor() {
    console.log('Hello ListBillsComponent Component');
    this.text = 'Hello World';
  }

}
