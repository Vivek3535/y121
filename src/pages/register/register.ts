import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/authservice/authservice';
import { HomescreenPage } from '../homescreen/homescreen';
import { FavteamPage } from '../favteam/favteam';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  responseData : any;
  createSuccess = false;
  userData = {"username": "","password": "", "name": "","email": ""};
constructor(private navCtrl: NavController, public authService:AuthService, public alertCtrl: AlertController) { } 
 backtomain()
      {
          this.navCtrl.push(HomescreenPage);
      }
      signup(){
        this.authService.postData(this.userData,'signup').then((result) => {
         this.responseData = result;
         if(this.responseData.userData){
         console.log(this.responseData);
         localStorage.setItem('userData', JSON.stringify(this.responseData));
         this.navCtrl.push(FavteamPage);
         }
         else{ this.showPopup("Error", "User already exists.");   }
       },  error => {
        this.showPopup("Error", error);
      });
     }
	 
	 showPopup(title, text) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: text,
        buttons: [
          {
            text: 'OK',
            handler: data => {
              if (this.createSuccess) {
                this.navCtrl.popToRoot();
                //this.nav.push('FavteamPage');
              }
            }
          }
        ]
      });
      alert.present(); 
    }
	
     login(){
       //Login page link
       this.navCtrl.push('Login');
     }

}