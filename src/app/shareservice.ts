import { Injectable } from '@angular/core';
import { App, NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../providers/authservice/authservice';
import { Http } from '@angular/http';
 
@Injectable()
export class ShareService {
     
    public userDetails: any;
  public resposeData: any;
  public dataSet: any;
  public noRecords: boolean;
  userPostData = {
    user_id: "",
    token: "",
    feed: "",
    feed_id: "",
    lastCreated: ""
  };
  responseData: any;
 
    constructor(public alertCtrl: AlertController, public nav: NavController, public http: Http, public app: App, public authService:AuthService) {
        
      this.userDetails.name;
    
      //  this.http.get('http://surahi.in/sfc-app/api/getallusers').map(res => res.json()).subscribe(data => {
      //      this.posts = data.data;
      //   });
    
    
    }
    getUserDataOnEveryPage() {
        const data1 = JSON.parse(localStorage.getItem('userData'));
        this.userDetails = data1.userData;
        this.userPostData.user_id = this.userDetails.user_id;
        this.userPostData.token = this.userDetails.token;
        this.userPostData.lastCreated = ""; 
        this.noRecords = false
    }
  
    
}