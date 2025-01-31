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
          dataFoods: data
        })
        .then((obj: any) => {
          resolve(obj);
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
          id_table: data.id_table,
          name: data.name,
          total: data.total,
          id_bill_detail: data.id_bill_detail,
          note: data.note,
          status:data.status,
          date: data.date,
          phu_phi:data.phu_phi,
          vat:data.vat
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
