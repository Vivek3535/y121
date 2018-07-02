import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestlistPage } from './contestlist';

@NgModule({
  declarations: [
    ContestlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ContestlistPage),
  ],
})
export class ContestlistPageModule {}
