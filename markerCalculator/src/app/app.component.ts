import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen,SQLite } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        //;CREATE TABLE IF NOT EXISTS dittance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
        db.executeSql("CREATE TABLE IF NOT EXISTS GPSList (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, gpsXt double,gpsYt double); CREATE TABLE IF NOT EXISTS distance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance double, soutceMarkerID INTEGER, Bearing double)", {}).then((data) => {
          console.log("TABLE CREATED: ", JSON.stringify(data));
        }, (error) => {
          console.error("Unable to execute sql", JSON.stringify(error));
        })
      }, (error) => {
        console.error("Unable to open database", JSON.stringify(error));
      });



    });
  }
}
