import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
 

@IonicPage()
@Component({
  selector: 'page-homescreen',
  templateUrl: 'homescreen.html'
})
export class HomescreenPage {

  @ViewChild('username') uname;
  @ViewChild('password') password; 

  constructor(public navCtrl: NavController) {

  }

signIn(){
   
   this.navCtrl.setRoot(LoginPage);
}

register(){
   this.navCtrl.setRoot(RegisterPage);
}


}