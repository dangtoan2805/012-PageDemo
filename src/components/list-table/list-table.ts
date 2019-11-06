import { Component, Input } from '@angular/core';

/**
 * Generated class for the ListTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list-table',
  templateUrl: 'list-table.html'
})
export class ListTableComponent {
  // get data list table
  @Input() tang;

  constructor() {
  }

}
