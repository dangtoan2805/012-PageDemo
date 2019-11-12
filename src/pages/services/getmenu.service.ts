import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
@Injectable()
export class GetMenuService {
  private snapshotChangesSubscription: any;
  private _DB: any;
  constructor() {
    this._DB = firebase.firestore();
  }

  getCollection(name) {
    // name : ten collection
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
        .collection(name)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getListBill(bill) {
    // name : ten collection
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
        .collection(bill)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getListBillGoHome(bill,id) {
    // name : ten collection
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
        .collection(bill).where("id_area","==",id)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getBillDetailById(name,id) {
    // name : ten collection
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
        .collection(name).doc(id)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  writeDataToFirebase(array, collectionName) {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
        .collection(collectionName)
        .doc()
        .set(array)
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
