import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowfriendsPage } from './followfriends';

@NgModule({
  declarations: [
    FollowfriendsPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowfriendsPage),
  ],
})
export class FollowfriendsPageModule {}
