import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProfilePage } from '../profile/profile';
import { ContestselectedPage } from '../contestselected/contestselected';
/**
 * Generated class for the ContestlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contestlist',
  templateUrl: 'contestlist.html',
})
export class ContestlistPage {
  posts: any; 
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    this.http.get('http://sfc.dimensiongraphic.com/sfc-app/api/getchallenges').map(res => res.json()).subscribe(data => {
      this.posts = data.data;
     
    });
  }
  backtoprofile()
  {
    this.navCtrl.push(ProfilePage);
  }
  getchallenge()
  {
    this.navCtrl.push(ContestlistPage);
  }
  gotocontestlist()
  {
    this.navCtrl.push(ContestselectedPage);
  }
}
