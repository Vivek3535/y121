import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ContestinnerPage } from '../contestinner/contestinner';
import { ContestlistPage } from '../contestlist/contestlist';
/**
 * Generated class for the ContestselectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contestselected',
  templateUrl: 'contestselected.html',
})
export class ContestselectedPage {
  posts: any; 
  map: any;
  currentdate;
  lastdate;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    this.ionViewDidLoad();
    var date = new Date();
    this.currentdate = date;
    console.log(this.currentdate);
    console.log(this.lastdate);
  }

  ionViewDidLoad() {
    this.http.get('http://sfc.dimensiongraphic.com/sfc-app/api/getchallenges').map(res => res.json()).subscribe(data => {
      this.posts = data.data;
     console.log(this.posts);
    });
  }

 dateDifference() {
  //var dropdt = new Date(this.currentdate);
  //var pickdt = new Date(this.lastdate);
  //return parseInt((dropdt - pickdt) / (24 * 3600 * 1000));
}
gotocontestselect()
{
  this.navCtrl.push(ContestinnerPage);
}
backtoselectprofile()
{
  this.navCtrl.push(ContestlistPage);

}
}
