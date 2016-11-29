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
  public gpsDataSet:any;
  public itemList: Array<Object>;

  constructor(public navCtrl: NavController,public mymarks: MarkerService,public sqliteopeator:SqliteService,public alerCtrl: AlertController) {
    this.itemList=[];
    this.loadDataSet();


  }

  public loadDataArray() {
    this.sqliteopeator.getGPSList().then((result) => {
      this.itemList = <Array<Object>> result;
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }




  public loadDataSet() {

    // this.sqliteopeator.showTable("GPSList").then(data=>{
    //   this.gpsdata=data;
    //   console.log("get data");
    // });
    //
    // for(let i = 0; i < this.gpsdata.rows.length; i++) {
    //   console.log("json output: "+ this.gpsdata.rows.item(i).markerID);
    // }


    this.sqliteopeator.getGPSData().then((result) => {
      this.gpsDataSet = result;

      for(let i = 0; i < this.gpsDataSet.rows.length; i++) {
        console.log("gpsDataSet output: "+ this.gpsDataSet.rows.item(i).markerID);
      }
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
        console.log("data Length: "+ this.myData.length);
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

        this.loadDataArray();

        console.log("current length : "+ this.itemList.length);
        var arrayLenth=this.itemList.length;
        this.doAlert(arrayLenth);

        ///this.myNumber=this.reveivedNumber;
         // this.doAlert(this.reveivedNumber);



        //this.doAlert(this.reveivedNumber);


      });
   // console.log(this.myData);

  }
  uploadDataToServer(){
    console.log("upload");

    this.sqliteopeator.showTable("GPSList").then(data=>{
      this.gpsdata=data;
      console.log("get data");
    });

    for(let i = 0; i < this.gpsdata.rows.length; i++) {
      console.log("json output: "+ this.gpsdata.rows.item(i).markerID);
    }

   console.log(JSON.stringify(this.gpsdata.row.length));
    var numbersOfRecored=this.gpsdata.row.length;

    this.doAlert(numbersOfRecored);

  }

  doAlert(arrayLenth:number) {
    console.log("bofre Alert "+arrayLenth);

    let alert = this.alerCtrl.create({
      title: 'Data Received',
      message: arrayLenth + ' rows new data have been downloaded to local device',
      buttons: ['Ok']
    });
    alert.present()
  }
  
  public dataCheck(){
   // this.itemList=this.sqliteopeator.myQueryList;
    //let myCheck=this.sqliteopeator.myQueryList.length;
    console.log("data check");
    this.loadDataArray();
    console.log("current length : "+ this.itemList.length);
    var arrayLenth=this.itemList.length;
    this.doAlert(arrayLenth);



  }




}
