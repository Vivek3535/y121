import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomescreenPage } from '../pages/homescreen/homescreen';
import { HomePage } from '../pages/home/home';
import { FollowfriendsPage } from '../pages/followfriends/followfriends'; 
import { ProfilePage } from '../pages/profile/profile';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'app.html' 
}) 

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = HomescreenPage;

  pages: Array<{title: string, component: any}>;
  
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {  
    this.initializeApp(); 

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Follow Friends', component: FollowfriendsPage },
	  { title: 'Profile', component: ProfilePage }
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  

}