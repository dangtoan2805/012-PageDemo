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

  constructor() {
    console.log('Hello HomeBillComponent Component');
    this.text = 'Hello World';
  }

}
