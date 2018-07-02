import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SfclanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sfclanguage',
  templateUrl: 'sfclanguage.html',
})
export class SfclanguagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SfclanguagePage');
  }
gotosfcfav()
  {
    this.navCtrl.setRoot("SfcfavPage");
  }

}
