import { Component } from "@angular/core";

@Component({
  selector: "home-info",
  templateUrl: "home-info.html"
})
export class HomeInfoComponent {
  text: string;

  constructor() {
    console.log("Hello HomeInfoComponent Component");
    this.text = "Hello World";
  }
}
