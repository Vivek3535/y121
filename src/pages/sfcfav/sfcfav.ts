import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SfcfavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sfcfav',
  templateUrl: 'sfcfav.html',
})
export class SfcfavPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SfcfavPage');
  }
  gotosfclan()
  {
    this.navCtrl.setRoot('SfclanguagePage');
  }
  favback()
  {
    this.navCtrl.setRoot('FavteamPage');
  }
  
}
