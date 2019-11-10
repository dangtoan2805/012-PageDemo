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

  getCollection(menu) {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
        .collection(menu)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getListFood(){
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
      .collection("food")
        .get()
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getMenuFood(idMenu){
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this._DB
      .collection("food").where("id_menu", "==", idMenu)
        .get()
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  writeDataToFirebase(array,collectionName){
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
