import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
  downloadDataFromServer(){
    console.log("download");
  }
  uploadDataToServer(){
    console.log("upload");
  }


}
