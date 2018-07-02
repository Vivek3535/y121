import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Login } from '../login/login'
import { RegisterPage } from '../register/register'

 

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

  loginpage()
{
   this.navCtrl.setRoot(Login);
}

signup(){
  console.log('hii');
   this.navCtrl.setRoot(RegisterPage);
}


}