import { Component } from '@angular/core';

/**
 * Generated class for the ListTablesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list-tables',
  templateUrl: 'list-tables.html'
})
export class ListTablesComponent {

  text: string;

  constructor() {
    console.log('Hello ListTablesComponent Component');
    this.text = 'Hello World';
  }

}
