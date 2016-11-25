import { Component } from '@angular/core';

import { NavController,AlertController } from 'ionic-angular';
import { MarkerService } from '../../providers/marker-service';
import { SqliteService } from '../../providers/sqlite-service';
import { SQLite } from 'ionic-native';

@Component({
  selector: 'page-about',
  providers: [MarkerService,SqliteService],
  templateUrl: 'about.html'
})
export class AboutPage {
  public myData: any;
  public reveivedNumber:any;
  public myNumber:any;

  public database: SQLite;
  public postJson:any;
  public gpsdata:any;
  public itemList: Array<Object>;

  constructor(public navCtrl: NavController,public mymarks: MarkerService,public sqliteopeator:SqliteService,public alerCtrl: AlertController) {
    this.itemList=[];


  }

  public loadDataArray() {
    this.sqliteopeator.getGPSList().then((result) => {
      this.itemList = <Array<Object>> result;
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

  downloadDataFromServer(){
    console.log("download");
    var sqlquery='';

    this.mymarks.load()
      .then(data1 => {
        this.myData = data1;
        console.log(this.myData.length);
        var i=0;
        sqlquery='('+this.myData[0].Tid +','+this.myData[0].Xt+','+this.myData[0].Yt+')';
        for(i=1;i<this.myData.length;i++ ){
          //console.log(this.myData[i].Tid);

          sqlquery='('+this.myData[i].Tid +','+this.myData[i].Xt+','+this.myData[i].Yt+'),'+sqlquery;
        }

        //console.log(sqlquery);
        this.sqliteopeator.dropGPSListTable();
        this.sqliteopeator.recreateGPSListTable();
        this.sqliteopeator.dropDistanceTable();
        this.sqliteopeator.recreateDistanceTable();
        this.sqliteopeator.insertData("GPSList (markerID, gpsXt, gpsYt)",sqlquery);



        this.sqliteopeator.countTable("GPSList");
        console.log(this.itemList.length);
        this.loadDataArray();
        this.doAlert();

        ///this.myNumber=this.reveivedNumber;
         // this.doAlert(this.reveivedNumber);



        //this.doAlert(this.reveivedNumber);


      });
   // console.log(this.myData);

  }
  uploadDataToServer(){
    console.log("upload");

    this.gpsdata=this.sqliteopeator.showTable("GPSList");
    console.log(JSON.stringify(this.gpsdata.row.item));

  }

  doAlert() {
    console.log("bofre Alert "+this.itemList.length);

    let alert = this.alerCtrl.create({
      title: 'Data Received',
      message: this.itemList.length + ' rows new data have been downloaded to local device',
      buttons: ['Ok']
    });
    alert.present()
  }
  public dataCheck(){
   // this.itemList=this.sqliteopeator.myQueryList;
    //let myCheck=this.sqliteopeator.myQueryList.length;
    console.log("data check");
    this.loadDataArray();
    this.doAlert();



  }




}
