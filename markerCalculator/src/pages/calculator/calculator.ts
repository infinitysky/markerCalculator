//import { Component } from '@angular/core';
import {EventEmitter, HostListener, Component, Directive, Output} from 'angular2/core'

import { NavController } from 'ionic-angular';
//import { Validators,FormBuilder, FormGroup } from '@angular/forms';
import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
@Component({
  selector: 'page-calculator',
  //templateUrl: 'calculator.html'
  template: `
     <form *ngIf="showForm" (ngSubmit)="onSubmit($event)" [ngFormModel]="form">
       <input type="test" ngControl="name">
       <input type="test" ngControl="email">
       <input type="test" ngControl="username">
       <button type="submit">submit</button>
    </form>
  `


})
export class CalculatorPage {
  name:Control;
  username:Control;
  email:Control;

  form:ControlGroup;

  constructor(private builder:FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.name = new Control('', Validators.required);
    this.email = new Control('', Validators.required);
    this.username = new Control('', Validators.required);

    this.form = this.builder.group({
      name: this.name,
      email: this.email,
      username: this.username
    });
  }

  showForm:boolean = true;
  onSubmit(value:any):void {
    // code that happens when form is submitted
    // then reset the form
    this.showForm = false;
    setTimeout(() => {
      this.reset()
      this.showForm = true;
    });
  }

  reset() {
    this.createForm();
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
