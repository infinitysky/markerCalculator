import { Component,NgModule } from '@angular/core';


import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
@Component({
  selector: 'page-calculator',
  //templateUrl: 'calculator.html'
  template: `
     <form [formGroup]="myForm" (submit)="saveForm($event)"> 
       <ion-item>
         <ion-label stacked>Field 1</ion-label>
         <ion-input formControlName="field1" type="text"></ion-input> 
       </ion-item>
       <ion-item>
       
        <ion-label stacked>Field 2</ion-label>
        <ion-input formControlName="field2" type="text"></ion-input>
       </ion-item>
       <ion-item>
        <ion-label stacked>Field 3</ion-label>
        <ion-input formControlName="field3" type="text"></ion-input>
       </ion-item>
       <button type="submit">Save Form</button> 
     </form>
    `


})
export class CalculatorPage {


  constructor(public navCtrl: NavController,public builder:FormBuilder) {



    this.myForm = formBuilder.group({ field1: [''],
      field2: [''],
      field3: ['']
    });
    
  }


  saveForm(event){ event.preventDefault(); console.log(this.myForm.value);
  }


  //constructor(public navCtrl: NavController, formBuilder: FormBuilder ) {}


  cleanButtonClick(){
    console.log("clicked");
    //this.form.reset;

  }
  submitButtonClick(){
    console.log("clicked");
  }



}
