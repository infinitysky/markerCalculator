import { Component,NgModule } from '@angular/core';


import { NavController,AlertController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html'
  // template: `
  //    <form [formGroup]="myForm" (submit)="saveForm($event)">
  //      <ion-item>
  //        <ion-label stacked>Field 1</ion-label>
  //        <ion-input formControlName="field1" type="text"></ion-input>
  //      </ion-item>
  //      <ion-item>
  //
  //       <ion-label stacked>Field 2</ion-label>
  //       <ion-input formControlName="field2" type="text"></ion-input>
  //      </ion-item>
  //      <ion-item>
  //       <ion-label stacked>Field 3</ion-label>
  //       <ion-input formControlName="field3" type="text"></ion-input>
  //      </ion-item>
  //      <button type="submit">Save Form</button>
  //    </form>
  //   `


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
      title: 'Use this lightsaber?',
      message: 'Do you Accpet to use this lightsaber to do good across the intergalactic galaxy?',
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



}
