import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { RestProvider } from '../../providers/rest/rest';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { PuntosPage } from '../puntos/puntos';
//import { CitasPage } from '../citas/citas';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage 
{
  @ViewChild(Nav) nav: Nav;

	username:string;
  password:string;
  token : any;
  data = {'username':'', 'password':''};
  error : boolean = false;
  showLoginErrorMessage = false;
  datas:any;
  userData;
  urlImageUser;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public restProvider: RestProvider,
    public userDataProvider: UserdataProvider,
    public loadingCtrl: LoadingController
  ) 
  {
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad WelcomePage');
  }

  login()
  {
    this.showLoginErrorMessage = false;
    this.data.username = this.username;
    this.data.password = this.password;
    this.getJWTToken();
  }

  getJWTToken() 
  {
    let loading = this.loadingCtrl.create({
      content: 'Login...'
    });

    loading.present();

    this.restProvider.getJWTToken(this.data)
    .then(res => {
      this.token = res;
      if ( this.token.token === undefined) {
        console.log('error');
        this.error = true;
        loading.dismiss();
        this.showLoginErrorMessage = true;
      } else {
        this.userDataProvider.setToken(this.token.token); 
        this.getUserData(this.userDataProvider.getUserId());
        this.error = false;
        loading.dismiss();
      }
    }).catch(
      err => {
        console.log(err);
      }
    );
  }

  goToSignupPage()
  {
    this.navCtrl.push(SignupPage);
  }

  getUserData(userId)
  {
    this.restProvider.getWordpressUserData(userId)
      .then( data => {
        this.userData = data; 
        console.log(data);
        this.userDataProvider.setUserData(data); 

        if (this.userData.status.paciente) 
          this.userDataProvider.setStatus('Paciente');

        this.getWordPressUserAvatar(this.userData.avatar_id);

        this.setOneSignalId(userId, this.userDataProvider.getOneSignalId());

        this.userDataProvider.setUserDataReady(true);

        this.navCtrl.setRoot(PuntosPage);
      })
      .catch(
        err => {
          console.log(err);
      });
  }

  setOneSignalId(userId:number, oneSignalId:any)
  {
    var data = {'one_signal_id': oneSignalId};
    this.restProvider.setOneSignalId(userId, data);
  }

  getWordPressUserAvatar(idAvatar:number)
  {
    this.restProvider.getWordPressMediaById(idAvatar)
    .then(
      data => {
        var that = this;
        that.datas = data;
        this.userDataProvider.setUrlImageUser(that.datas.guid.rendered);  
      }
    )
    .catch(
      err => {
        console.log(err);
      }
    );
  }

}
