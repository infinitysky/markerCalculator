import { Component } from '@angular/core';

import { CalculatorPage } from '../calculator/calculator';
import { AboutPage } from '../about/about';
import { ReferencePage } from  '../reference/myreference';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = CalculatorPage;
  tab2Root: any = ReferencePage;
  tab3Root: any = AboutPage;


  constructor() {

  }
}
