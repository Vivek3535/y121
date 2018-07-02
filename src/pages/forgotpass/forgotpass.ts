import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Login } from '../login/login';
import { AuthService  } from '../../providers/authservice/authservice';
/**
 * Generated class for the ForgotpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpass',
  templateUrl: 'forgotpass.html',
})
export class ForgotpassPage {
	
	resposeData : any;
	userData = {"useremail":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpassPage');
  }
  backmain()
  {
    this.navCtrl.push(Login);
  }

	forgotpass(){
		this.presentLoading();
		if(this.userData.useremail){
			this.authService.postData(this.userData, "forgotpass").then((result) =>{
			this.resposeData = result;
			if(this.resposeData.message){
				this.presentToast("New password successfully sent to you on mail.");
				this.navCtrl.push(Login);
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
	
	presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 6000,
			position: 'bottom'
		});
		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}
}
