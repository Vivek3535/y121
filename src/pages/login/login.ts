
import { Component } from '@angular/core';
import { AuthService  } from '../../providers/authservice/authservice';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HomescreenPage } from '../homescreen/homescreen';
import { ForgotpassPage } from '../forgotpass/forgotpass';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  
  resposeData : any;
  userData = {"username":"", "password":""};

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public authService: AuthService, public alertCtrl: AlertController) {
  }

  backtomain()
      {
          this.navCtrl.push(HomescreenPage);
      }

      forGotpassPage()
      {
          this.navCtrl.push(ForgotpassPage);
      }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Login');
  }

  login(){
   this.presentLoading();
   if(this.userData.username && this.userData.password){
    this.authService.postData(this.userData, "login").then((result) =>{
    this.resposeData = result;
    if(this.resposeData.userData){
      console.log(this.resposeData.userData);
     localStorage.setItem('userData', JSON.stringify(this.resposeData) )
    this.navCtrl.push(HomePage);
  }
  else{
    this.showAlert();
  }
    


    }, (err) => {
      //Connection failed message
    });
   }
   else{
    this.showAlert();
   }
  
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }


  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Incorrect!',
      subTitle: 'Username and Password',
      buttons: ['OK']
    });
    alert.present();
  }

}
