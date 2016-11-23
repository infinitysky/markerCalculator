import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-reference',
  templateUrl: 'myreference.html'
})
export class ReferencePage {

  referenceDetailsForm:FormGroup;
  constructor(public navCtrl: NavController, public formBuilder:FormBuilder) {
    this.referenceDetailsForm = formBuilder.group({

      marker1Tid:[''],
      marker1GPSLatitude:[''],
      marker1GPSLongitude:[''],
      marker2Tid:[''],
      marker2GPSLatitude:[''],
      marker2GPSLongitude:[''],
    });
  }




  cleanButtonClick(){
    console.log("clicked");
    this.referenceDetailsForm.reset();


  }
  submitButtonClick(){
    console.log("Submit Clicked");
    console.log(this.referenceDetailsForm.value);
  }

}
