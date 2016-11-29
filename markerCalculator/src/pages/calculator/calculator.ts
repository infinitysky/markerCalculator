import { Component } from '@angular/core';


import { NavController,AlertController  } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarkerService } from '../../providers/marker-service';
import { SqliteService } from '../../providers/sqlite-service';

//import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';


@Component({
  selector: 'page-calculator',

  providers: [MarkerService,SqliteService],
  templateUrl: 'calculator.html'

})
export class CalculatorPage {
  public tmpData;
  public mark1Data:any;
  public mark2Data:any;

 // markerDetailsForm: FormGroup;
  public markerList: Array<Object>;
  public calculatorFullQueryData:any;

  public markerCheck1 :boolean;
  public markerCheck2 :boolean;
  public cmarker1ID : number;
  public cmarker1Distance : number;
  public cmarker1Bearing : number;
  public cmarker2ID : number;
  public cmarker2Distance : number;
  public cmarker2Bearing : number;
  public cCurrentID :number;
  public newXt : number;
  public newYt : number;
  public newErrorRate : number;




  public markerDetailsForm = this.formBuilder.group({
    currentTID:[''],
    marker1Tid:[''],
    marker1Distance:[''],
    marker1Bearing:[''],
    marker2Tid:[''],
    marker2Distance:[''],
    marker2Bearing:['']
  });

  constructor(public navCtrl: NavController,public formBuilder:FormBuilder,public alertCtrl: AlertController,public sqliteopeator:SqliteService,) {
    this.markerList=[];
    this.calculatorFullQueryData="";
    this.markerCheck1=false;
    this.markerCheck2=false;


    this.loadGPSdata();

    console.log("------------------------------");



  }



  //constructor(public navCtrl: NavController, formBuilder: FormBuilder ) {}


  cleanButtonClick(){
    console.log("clean Button Clicked");
    this.markerDetailsForm.reset();


  }
  submitButtonClick(){

   // this.loadGPSdata();
    //console.log(this.calculatorFullQueryData.rows.length);

    console.log("Submit Clicked");
    console.log(this.markerDetailsForm.value.currentTID);

    this.cCurrentID=this.markerDetailsForm.value.currentTID;

    this.cmarker1ID=this.markerDetailsForm.value.marker1Tid;
    this.cmarker1Distance=this.markerDetailsForm.value.marker1Distance;
    this.cmarker1Bearing=this.markerDetailsForm.value.marker1Bearing;


    this.cmarker2ID=this.markerDetailsForm.value.marker2Tid;
    this.cmarker2Distance=this.markerDetailsForm.value.marker2Distance;
    this.cmarker2Bearing=this.markerDetailsForm.value.marker2Bearing;

    console.log(this.cmarker1ID);
    console.log(this.cmarker2ID);

    this.markerExistCheck();
    //this.markerExistCheck(2,this.cmarker2ID);

    console.log(this.markerCheck1);
    console.log(this.markerCheck2);

    this.calculator();
    this.showConfirm();

    // if(this.markerCheck1==false){
    //   console.log(this.markerCheck1);
    //   this.doAlert("Marker1 is not exist in database");
    //
    // }
    // else if(this.markerCheck2==false){
    //   console.log(this.markerCheck2);
    //   this.doAlert("Marker2 is not exist in database");
    //
    // }else{
    //   console.log(this.markerCheck1);
    //   console.log(this.markerCheck2);
    //   this.calculator();
    //   this.showConfirm();
    //
    // }




  }


  showConfirm() {


    let confirm = this.alertCtrl.create({
      title: 'Do you accept the difference?',
      message: 'Do you accept the difference '+ this.newErrorRate +' between X1Y1 and X2Y2 ?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');


          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            console.log(this.markerDetailsForm.value);
            var sqlquery='('+this.cCurrentID+','+this.newXt+','+this.newYt+')';
            console.log(sqlquery);

            this.sqliteopeator.insertData("GPSList (markerID, gpsXt, gpsYt)",sqlquery);

            this.markerDetailsForm.reset();
          }
        }
      ]
    });
    confirm.present();
  }

  public loadDataArray() {
    console.log("loading gps array");
    this.sqliteopeator.getGPSList().then((result) => {

      this.markerList = <Array<Object>> result;

      console.log("markerlist loaded");

    }, (error) => {
      console.log("ERROR: ", error);
    });

  }

  public loadGPSdata(){
    console.log("loading gps data----");
    // this.sqliteopeator.getGPSData().then((data)=>{
    //   console.log("markerdata loaded");
    //   this.tmpData=data;
    //   console.log(" this ths "+this.tmpData.rows.lenth);
    //
    //   }
    // );
    this.calculatorFullQueryData=this.sqliteopeator.fullQueryData;
    console.log(JSON.stringify(this.tmpData));
    console.log("this this the end?");

  }

  public getMarkerInfo(){



  }


  public calculator(){
//   #得到Marker1的x,y,distance(r)以及bearing(o)的信息
//     x1 = GPS$Xt[which(GPS$Tid==Dis$Mid1[i])];
//     y1 = GPS$Yt[which(GPS$Tid==Dis$Mid1[i])];
//     r1 = Dis$Dis1[i]
//     o1 = Dis$Bear1[i]
// #计算根据Marker1所得到的currentID的坐标信息（Xt1,Yt1），pi取3.14159
//     Xt1 = sin((11.75+o1+180)/180*pi)*r1 + x1
//     Yt1 = cos((11.75+o1+180)/180*pi)*r1 + y1
//
// #得到Marker2的x,y,distance(r)以及bearing(o)的信息
//     x2 = GPS$Xt[which(GPS$Tid==Dis$Mid2[i])];
//     y2 = GPS$Yt[which(GPS$Tid==Dis$Mid2[i])];
//     r2 = Dis$Dis2[i]
//     o2 = Dis$Bear2[i]
// #计算根据Marker2所得到的currentID的坐标信息(Xt2,Yt2),pi取3.14159
//     Xt2 = sin((11.75+o2+180)/180*pi)*r2 + x2
//     Yt2 = cos((11.75+o2+180)/180*pi)*r2 + y2
//   #计算根据不同Marker得到的坐标信息之间的误差Error（Er）
//   Er = sqrt((Xt1-Xt2)^2+(Yt1-Yt2)^2)


    var x1=this.mark1Data.gpsXt;
    var y1=this.mark1Data.gpsYt;
    var x2=this.mark2Data.gpsXt;
    var y2=this.mark2Data.gpsYt;
    var r1=this.cmarker1Distance;
    var r2=this.cmarker2Distance;
    var o1=this.cmarker1Bearing;
    var o2=this.cmarker2Bearing;


    var Xt1 = Math.asin((11.75+o1+180)/180* Math.PI) * r1 + x1;
    var Yt1 = Math.acos((11.75+o1+180)/180* Math.PI) * r1 + y1;

    var Xt2 = Math.asin((11.75+o2+180)/180*Math.PI)*r2 + x2;
    var Yt2 = Math.acos((11.75+o2+180)/180*Math.PI)*r2 + y2;

    //var Er = Math.sqrt(((Xt1-Xt2)*(Xt1-Xt2)) + ((Yt1-Yt2)*(Yt1-Yt2)));

    var tempData=((Xt1-Xt2)*(Xt1-Xt2)) + ((Yt1-Yt2)*(Yt1-Yt2));
    var Er = Math.sqrt(tempData);

    //var Er2 = mathjs.math.sqrt(tempData);

    this.newErrorRate=Er;



    // if (Er<3){
      this.newXt = ((Xt1+Xt2)/2);
      this.newYt = ((Yt1+Yt2)/2);
    // }
    console.log("XT1 :"+Xt1);
    console.log("YT1 :"+Yt1);
    console.log("XT2 :"+Xt2);
    console.log("YT2 :"+Yt2);
    console.log("Er :"+Er);

    console.log("this.newXt :"+this.newXt);
    console.log("this.newYt :"+this.newYt);
    console.log("tempData: "+ tempData);
   // console.log("Er2: "+ Er2);
    console.log("this.newErrorRate :"+this.newErrorRate);






  }



  public markerExistCheck(){


    this.sqliteopeator.searchVale(this.cmarker1ID).then((data)=>{
      this.tmpData=data;
      this.mark1Data=this.tmpData.rows.item(0);;
      console.log(this.mark1Data);
      if(this.tmpData.rows.length>0){

        this.markerCheck1=true;
      }



    }, (error) => {
      console.log("ERROR: ", error);
    });

    this.sqliteopeator.searchVale(this.cmarker2ID).then((data)=>{
      this.tmpData=data;
      this.mark2Data=this.tmpData.rows.item(0);;
      console.log(this.mark2Data);


      if(this.tmpData.rows.length>0){
        this.markerCheck2=true;
      }


    }, (error) => {
      console.log("ERROR: ", error);
    });



  }

  doAlert(alertString:string) {

    let alert = this.alertCtrl.create({
      title: 'Marker',
      message: alertString,
      buttons: ['Ok']
    });
    alert.present();
  }









}
