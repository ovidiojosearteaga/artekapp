import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { RestProvider } from '../../providers/rest/rest';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { NoticiaPage } from '../noticia/noticia';
import { NoticiasPage } from '../noticias/noticias';
import { SecretariaPage } from '../secretaria/secretaria';

import { PersonaldataProvider } from './../../providers/personaldata/personaldata';
import { StoragenoticeProvider } from '../../providers/storagenotice/storagenotice';

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
  initialPage:any = NoticiasPage;
  showContent:boolean = false;
  loading:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public restProvider: RestProvider,
    public userDataProvider: UserdataProvider,
    public loadingCtrl: LoadingController,
    public personalData: PersonaldataProvider,
    public storageNotice: StoragenoticeProvider,
    public alertCtrl: AlertController,
  ) 
  {
    this.showContent = false;
    this.verifiAccess();
  }

  private verifiAccess()
  {
    this.personalData.havePersonalData().then(result => { 
      if (result !== undefined) {
        this.personalData.getPersonalData().then( result => {
          this.userDataProvider.setUserData(result);
          this.saveToken(result);
        });
      } else {
        this.showContent = true;
      }
    });
  }

  private saveToken(result)
  {
    let isSecretaria = result.status.secretaria;
    this.personalData.getPersonalToken().then(result => {
      this.userDataProvider.setToken(result);
      this.updateUserData(isSecretaria);
    });
  }

  private updateUserData(isSecretaria) 
  {
    this.personalData.deletePersonalData();
    this.getUserData(this.userDataProvider.getUserId());
    this.userDataProvider.setUserDataReady(true);
    this.goToInitialPage(isSecretaria);
  }

  private goToInitialPage(isSecretaria: boolean)
  {
    this.storageNotice.getIdNotice().then( (idNotice) => {

      if (idNotice == null && isSecretaria !== true) {
        this.navCtrl.setRoot(this.initialPage);

      } else if (isSecretaria) {
        this.navCtrl.setRoot(SecretariaPage);
        
      } else {
        this.navCtrl.push(NoticiaPage, {
          noticeId: idNotice
        });
      }
    });
  }

  ionViewDidLoad() 
  {
  }

  /*
  ionViewDidEnter() 
  {
    this.showContent = false;
    this.verifiAccess();
  }
  */

  login()
  {
    this.showLoginErrorMessage = false;
    this.data.username = this.username;
    this.data.password = this.password;
    this.getJWTToken();
  }

  getJWTToken() 
  {
    this.loading = this.loadingCtrl.create({
      content: 'Login...'
    });

    this.loading.present();
    
    this.restProvider.getJWTToken(this.data)
    .then(res => {
      this.token = res;
      if ( this.token.token === undefined) {
        this.error = true;
        this.loading.dismiss();
        this.showLoginErrorMessage = true;
      } else {
        this.userDataProvider.setToken(this.token.token); 
        this.personalData.setPersonalToken(this.token.token);
        this.getUserData(this.userDataProvider.getUserId());
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
        
        if (!this.userData.is_adult) {
          if (!this.userData.status.secretaria) {
            this.error = true;
            this.loading.dismiss();
            this.showLoginErrorMessage = true;
            return; 
          }
        }

        this.error = false;
        this.userDataProvider.setUserData(data); 

        if (this.userData.status.paciente) 
          this.userDataProvider.setStatus('Paciente');

        this.getWordPressUserAvatar(this.userData.avatar_id);

        this.setOneSignalId(userId, this.userDataProvider.getOneSignalId());

        this.userDataProvider.setUserDataReady(true);

        this.personalData.setPerosalData(this.userDataProvider.getUserData());
        this.loading.dismiss();
        this.goToInitialPage(this.userData.status.secretaria);
        
      })
      .catch(
        err => {
          //console.log(err);
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
        //console.log(err);
      }
    );
  }

  lostPassword()
  {
    const confirm = this.alertCtrl.create({
      title: 'Salir',
      message: '¿Deseas recuperar tu contraseña?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Sí',
          handler: () => {
            this.resetPassword();
          }
        }
      ]
    });
    confirm.present();
  }

  resetPassword()
  {
    let inputAlert = this.alertCtrl.create({
      title: 'Recuperar mi contraseña',
      message: 'Introduce tu número de cédula.',
      inputs: [
        {
          name: 'cedula',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.recoverUserPassword(data.cedula);
          }
        }
      ]
    });
    inputAlert.present();
  }

  recoverUserPassword(cedula:string)
  {
    let solicitandoLoading = this.loadingCtrl.create({
      content: 'Enviando solicitud de cambio de contraseña...',
    });
    solicitandoLoading.present();

    if (cedula == '') {
      let alertNotCedula = this.alertCtrl.create({
        title: 'Recuperar mi contraseña',
        message: 'Introduce un número de cédula.',
        buttons: [
          {
            text: 'Ok',
          }
        ]
      });

      solicitandoLoading.dismiss();
      alertNotCedula.present();
      return;
    }

    console.log('cambiando pass para '+cedula);
    this.restProvider.recoverUserPassword(cedula)
      .then(data => {
        console.log(data); 
        if (data == 'not-found') {
          let alertNotFound = this.alertCtrl.create({
            title: 'Recuperar mi contraseña',
            message: 'Paciente no encontrado, vuelve a intentarlo.',
            buttons: [
              {
                text: 'Ok',
              }
            ]
          });
          solicitandoLoading.dismiss();
          alertNotFound.present();
        }

        if (data == true) {
          let alertTrue = this.alertCtrl.create({
            title: 'Listo!',
            message: 'Se a enviado tu nueva contraseña a tu correo electrónico.',
            buttons: [
              {
                text: 'Ok',
              }
            ]
          });
          solicitandoLoading.dismiss();
          alertTrue.present();
        }
        
      })
      .catch(err => {
        console.log(err);
      });

  }

}
