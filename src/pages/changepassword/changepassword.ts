import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AuthService  } from '../../providers/authservice/authservice';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'changepassword.html',
})
export class ChangePasswordPage {

	resposeData : any;
	public currentUser:any;
	userData = {"useremail":"", "password":"", "newpassword":""};
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
	  this.currentUser = localStorage.getItem('userData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
	
	changepass(){
		this.presentLoading();
		if(this.userData.useremail && this.userData.password && this.userData.newpassword && (this.userData.password != this.userData.newpassword)){
			this.authService.postData(this.userData, "changepassword").then((result) =>{
			this.resposeData = result;
			if(this.resposeData.userData){
				console.log(this.resposeData.userData);
				/*localStorage.setItem('userData', JSON.stringify(this.resposeData) )*/
				this.presentToast("Password Updated successfully.");
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
