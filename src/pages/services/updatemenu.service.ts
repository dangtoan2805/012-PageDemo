import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
@Injectable()
export class UpdateMenuService {
  private snapshotChangesSubscription: any;
  private _DB: any;
  constructor() {
    this._DB = firebase.firestore();
  }
  
  updateMenu(id, value) {
    return new Promise((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
        .collection("bill")
        .doc(id)
        .set(value)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  updateTableStatus(id,data){
    return new Promise((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB.
      collection('table')
        .doc(id)
        .set(data)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  updateCollectionById(name,id,data){
    return new Promise((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB.
      collection(name)
        .doc(id)
        .set(data)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  updateBillDetailById(name,id,data){
    return new Promise((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB.
      collection(name)
        .doc(id)
        .set({dataFoods:data})
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
