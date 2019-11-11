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
  pushDetailBill(data) {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
        .collection("bill_detail")
        .add({
          dataFoods: data.dataFoods,
          id_table:data.id_table,
          note:data.note
        })
        .then((obj: any) => {
          resolve(obj.id);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  pushListBill(data) {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
        .collection("bill")
        .add({
          id_area: data.id_area,
          name: data.name,
          total: data.total,
          id_bill_detail: data.id_bill_detail,
          status:data.status,
          date: data.date
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
