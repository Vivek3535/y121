import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomescreenPage } from './homescreen';

@NgModule({
  declarations: [
    HomescreenPage,
  ],
  imports: [
    IonicPageModule.forChild(HomescreenPage),
  ],
  exports: [
    HomescreenPage
  ]
}) 
export class HomescreenPageModule {


}
