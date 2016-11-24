import { Component } from '@angular/core';


import { NavController,AlertController  } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarkerService } from '../../providers/marker-service';
import { SqliteService } from '../../providers/sqlite-service';

//import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
import * as mathjs from "mathjs";

@Component({
  selector: 'page-calculator',
  providers: [MarkerService,SqliteService],
  templateUrl: 'calculator.html'

})
export class CalculatorPage {
  public tmpData;
 // markerDetailsForm: FormGroup;
  public markerList: Array<Object>;
  public calculatorFullQueryData:any;

  public markerCheck1 :boolean;
  public markerCheck2 :boolean;
  public cmarker1ID : any;
  public cmarker1Distance : any;
  public cmarker1Bearing : any;
  public cmarker2ID : any;
  public cmarker2Distance : any;
  public cmarker2Bearing : any;
  public cCurrentID :any;



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
    console.log("clicked");
    this.markerDetailsForm.reset();


  }
  submitButtonClick(){

    this.loadGPSdata();
    console.log(this.calculatorFullQueryData.rows.length);

    console.log("Submit Clicked");
    console.log(this.markerDetailsForm.value.currentTID);

    this.cCurrentID=this.markerDetailsForm.value.currentTID;

    this.cmarker1ID=this.markerDetailsForm.value.marker1Tid;
    this.cmarker1Distance=this.markerDetailsForm.value.marker1Distance;
    this.cmarker1Bearing=this.markerDetailsForm.value.marker1Bearing;


    this.cmarker2ID=this.markerDetailsForm.value.marker2Tid;
    this.cmarker2Distance=this.markerDetailsForm.value.marker2Distance;
    this.cmarker2Bearing=this.markerDetailsForm.value.marker2Bearing;

    this.markerExistCheck(1,this.cmarker1ID);
    this.markerExistCheck(2,this.cmarker2ID);

    if(this.markerCheck2!=true){
      this.doAlert("Marker2 is not exist in database");

    }
    else if(this.markerCheck1!=true){
      this.doAlert("Marker1 is not exist in database");

    }else{
      this.showConfirm();

    }




  }


  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Do you accept the difference?',
      message: 'Do you accept the difference'+ 'xxx' +'between X1Y1 and X2Y2 ?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');


            this.markerDetailsForm.value.marker2Tid=[''];
            this.markerDetailsForm.value.marker2Distance=[''];
            this.markerDetailsForm.value.marker2Bearing=[''];
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            console.log(this.markerDetailsForm.value);
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
  public calculator(distance,baring){

  }



  public markerExistCheck(markerCheck:number,checkMarkerID:number){

    this.sqliteopeator.searchVale(checkMarkerID).then((data)=>{

      this.tmpData=data;

      //console.log(this.tmpData);
      if(this.tmpData.length<1){
        console.log("404 not found");
        //this.doAlert("marker1 not exist","Marker Not Exist");
      }else{
        if(1==markerCheck){
          this.markerCheck1=true;
        }
        if(2==markerCheck){
          this.markerCheck2=true;
        }

        console.log(this.tmpData);
      }

      console.log("marker1 check");

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
