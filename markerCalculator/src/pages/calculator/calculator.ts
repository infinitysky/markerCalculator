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

 // markerDetailsForm: FormGroup;

  public markerDetailsForm = this.formBuilder.group({
    currentTID:[''],
    marker1Tid:[''],
    marker1Distance:[''],
    marker1Bearing:[''],
    marker2Tid:[''],
    marker2Distance:[''],
    marker2Bearing:['']
  });

  constructor(public navCtrl: NavController,public formBuilder:FormBuilder,public alertCtrl: AlertController) {


  }



  //constructor(public navCtrl: NavController, formBuilder: FormBuilder ) {}


  cleanButtonClick(){
    console.log("clicked");
    this.markerDetailsForm.reset();


  }
  submitButtonClick(){
    console.log("Submit Clicked");
    console.log(this.markerDetailsForm.value.currentTID);
    this.showConfirm();
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

  getMarkerInfo(){

  }





}
