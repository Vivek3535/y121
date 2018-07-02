import { AuthService } from '../../providers/authservice/authservice';
import { Component, ViewChild } from '@angular/core';
import { App, NavController, IonicPage, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomescreenPage } from '../homescreen/homescreen';
import { FollowfriendsPage } from '../followfriends/followfriends';
import { Common } from "../../providers/common";
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild("updatebox") updatebox;
  public userDetails: any;
  public imageURI: any;
  public imageFileName: any;
  public resposeData: any;
  public resposePostData: any;
  public dataSet: any;
  public photos: any;
  public noRecords: boolean;
  public base64Image: string;
  userPostData = {
    user_id: "",
    token: "",
    feed: "",
    feed_id: "",
    lastCreated: ""
  };
  responseData: any;
  mediaFiles = [];
  // posts: any;

  constructor(public alertCtrl: AlertController, public nav: NavController, public http: Http, public app: App, public authService: AuthService, public common: Common, private camera: Camera, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private transfer: FileTransfer, private socialSharing: SocialSharing, private file: File, public fileOpener: FileOpener, ) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.lastCreated = "";
    this.noRecords = false
    this.getFeed();
    this.getPosts();

  }


  getFeed() {
    this.common.presentLoading();
    this.authService.postData(this.userPostData, "feed").then(
      result => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.common.closeLoading();
          this.dataSet = this.resposeData.feedData;
          const dataLength = this.resposeData.feedData.length;
          this.userPostData.lastCreated = this.resposeData.feedData[
            dataLength - 1
          ].created;
        } else {
          console.log("No access");
          this.common.closeLoading();
        }
      },
      err => {
        //Connection failed message
      }
    );
  }

  getPosts() {
    //this.common.presentLoading();
    this.authService.postData(this.userPostData, "getposts").then(
      result => {
        this.resposePostData = result;
        if (this.resposePostData.success) {
          //this.common.closeLoading();
          this.photos = this.resposePostData.success;
        } else {
          console.log("No access");
        }
      },
      err => {
        //Connection failed message
        console.log("out");
      }
    );
  }

  feedUpdate() {
    if (this.userPostData.feed) {
      this.common.presentLoading();
      this.authService.postData(this.userPostData, "feedUpdate").then(
        result => {
          this.resposeData = result;
          if (this.resposeData.feedData) {
            this.common.closeLoading();
            this.dataSet.unshift(this.resposeData.feedData);
            this.userPostData.feed = "";
            console.log(this.resposeData.feedData);
            //this.updatebox.setFocus();
            setTimeout(() => {
              //  this.updatebox.focus();
            }, 150);
          } else {
            console.log("No access");
          }
        },
        err => {
          //Connection failed message
        }
      );
    }
  }

  feedDelete(feed_id, msgIndex) {
    if (feed_id > 0) {
      let alert = this.alertCtrl.create({
        title: "Delete Feed",
        message: "Do you want to buy this feed?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          },
          {
            text: "Delete",
            handler: () => {
              this.userPostData.feed_id = feed_id;
              this.authService.postData(this.userPostData, "feedDelete").then(
                result => {
                  this.resposeData = result;
                  if (this.resposeData.success) {
                    this.dataSet.splice(msgIndex, 1);
                  } else {
                    console.log("No access");
                  }
                },
                err => {
                  //Connection failed message
                }
              );
            }
          }
        ]
      });
      alert.present();
    }
  }



  doInfinite(e): Promise<any> {
    console.log("Begin async operation");
    return new Promise(resolve => {
      setTimeout(() => {
        this.authService.postData(this.userPostData, "feed").then(
          result => {
            this.resposeData = result;
            if (this.resposeData.feedData.length) {
              const newData = this.resposeData.feedData;
              this.userPostData.lastCreated = this.resposeData.feedData[
                newData.length - 1
              ].created;

              for (let i = 0; i < newData.length; i++) {
                this.dataSet.push(newData[i]);
              }
            } else {
              this.noRecords = true;
              console.log("No user updates");
            }
          },
          err => {
            //Connection failed message
          }
        );
        resolve();
      }, 500);
    });
  }

  converTime(time) {
    let a = new Date(time * 1000);
    return a;
  }

  ngOnInit() {
    this.photos = [];
  }

  takePhoto() {
    /*const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }*/
    let options = {
      quality: 100,
      mediaType: this.camera.MediaType.ALLMEDIA,
    };
    this.camera.getPicture(options).then((imageData) => {
      /*this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();*/

      let loading = this.loadingCtrl.create({
        content: 'Loading Please Wait...'
      });
      loading.present();
      /* Starts Preloader */
      /*this.presentToast(imageData);*/
      this.imageFileName = imageData.substring(imageData.lastIndexOf('/') + 1);
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options11: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.imageFileName,
        params: { "userData": this.userDetails.user_id },
        headers: {}
      }
      fileTransfer.upload(imageData, 'http://sfc.dimensiongraphic.com/sfc-app/api/postsUpload.php', options11, true).then((data) => {
        /* success
        /alert("success"); */
        loading.dismiss();
        if (data) {
          /*this.imageURI = data;*/
          this.base64Image = JSON.stringify(data);
          this.photos.push(this.base64Image);
          this.photos.reverse();
          this.presentToast("Image Uploaded successfully.");
        }
        else {
          this.presentToast("There was an error uploading the file, please try again!");
        }
      }, (err) => {
        // error
        //alert("error"+JSON.stringify(err));
        loading.present();
        this.presentToast(JSON.stringify(err));
      });
    }, (err) => {
      console.log(err);
    });
  }

  shareInfo(photo) {
    this.socialSharing.share(null, photo, null).
      then(() => {
        //alert("Sharing success");
      
        // Success!
      }).catch(() => {
        // Error!
        //alert("Share failed");
      });
  }

  likePhoto(ID) {
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.userPostData.feed_id = ID;
    this.authService.postData(this.userPostData, "likepost").then(
      result => {
        loading.dismiss();
        if (result) {
          this.presentToast("Like Submitted Successfully!");
        } else {
          this.presentToast("Error occurs while submitting like.");
        }
      },
      err => {
        //Connection failed message
        loading.dismiss();
        this.presentToast("Error occurs while submitting like.");
      }
    );

  }

  sharePhoto(ID) {
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.userPostData.feed_id = ID;
    this.authService.postData(this.userPostData, "sharepost").then(
      result => {
        loading.dismiss();
        if (result) {
          this.presentToast("Shared Successfully!");
        } else {
          this.presentToast("Error occurs while shareing post.");
        }
      },
      err => {
        //Connection failed message
        loading.dismiss();
        this.presentToast("Error occurs while shareing post.");
      }
    );

  }

  deletePhoto(ID, index) {
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo? There is NO undo!',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please Wait...'
            });
            loading.present();
            this.userPostData.feed_id = ID;
            this.authService.postData(this.userPostData, "deletepost").then(
              result => {
                loading.dismiss();
                if (result) {
                  console.log('Agree clicked');
                  this.photos.splice(index, 1);
                  this.presentToast("Post Deleted Successfully!");
                } else {
                  this.presentToast("Error occurs while deleting post.");
                }
              },
              err => {
                //Connection failed message
                loading.dismiss();
                this.presentToast("Error occurs while deleting post.");
              }
            );
          }
        }
      ]
    });
    confirm.present();
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

  comments = [];
  addComment(ID, newComment: string) {
    if (newComment) {
      let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      loading.present();
      this.userPostData.feed_id = ID;
      this.userPostData.feed = newComment;
      this.authService.postData(this.userPostData, "addpostcomment").then(
        result => {
          loading.dismiss();
          if (result) {
            this.comments.push(newComment);
            this.presentToast("Comment added successfully!");
          } else {
            this.presentToast("Error occurs while adding post comment.");
          }
        },
        err => {
          //Connection failed message
          loading.dismiss();
          this.presentToast("Error occurs while adding post comment.");
        }
      );
    }
  }


  deletecomnt($commnt) {
    // this.heroes.splice($commnt, 1);
    this.comments.splice(this.comments.indexOf($commnt), 1);
  }


  backToWelcome() {
    //  const root = this.app.getRootNav();
    //  root.popToRoot();
    this.nav.push(HomescreenPage);
  }

  logout() {

    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }

  newsfeeds() {
    //  const root = this.app.getRootNav();
    //  root.popToRoot();
    this.nav.push(HomePage);
  }

  followfrndsPage() {
    //  const root = this.app.getRootNav();
    //  root.popToRoot();
    this.nav.push(FollowfriendsPage);
  }

}