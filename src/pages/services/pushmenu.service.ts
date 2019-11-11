import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
@Injectable()
export class PushMenuService {
  private snapshotChangesSubscription: any;
  private _DB: any;
  constructor() {
    this._DB = firebase.firestore();
  }
  pushDetailBill(bill) {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
        .collection("bill_detail")
        .add({
          // id: bill.id,
          // name: bill.name,
          // price: bill.price,
          dataFoods: bill.dataFoods
        })
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  pushListBill(bill) {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
        .collection("bill")
        .add({
          id: bill.id,
          name: bill.name,
          price: bill.price,

          date: bill.date
        })
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
