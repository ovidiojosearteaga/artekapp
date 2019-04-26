import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { PersonaldataProvider } from '../../providers/personaldata/personaldata';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the CodigoqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-codigoqr',
  templateUrl: 'codigoqr.html',
})
export class CodigoqrPage {

  puntos:any;

  userId:any;

  type:any;

  userDisplayName:string;

  userCedula:any;

  qrData:any = null;

  createdCode:any = null;
  
  scannedCode:any = null;

  userIdOrigin:number;

  userCedulaOrigin:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userDataProvider: UserdataProvider,
    public restProvider: RestProvider,
    public personalData: PersonaldataProvider,
  ) 
  {
    this.puntos = this.navParams.get('puntos');
    this.userId = this.navParams.get('user_id');
    this.type = this.navParams.get('type');
    this.userDisplayName = this.navParams.get('user_display_name');
    this.userCedula = this.navParams.get('user_cedula');
    this.userIdOrigin = this.navParams.get('user_id_origin');
    this.userCedulaOrigin = this.navParams.get('user_cedula_origin');

    this.qrData = this.puntos + '.' + this.userId + '.' + this.userCedula + '.' + this.userIdOrigin + '.' + this.userCedulaOrigin;
    
    console.log(this.qrData);
    
    this.createCode();
    this.userDataProvider.updatePoints(this.puntos, 'rest');
    this.personalData.deletePersonalData();
    this.personalData.setPerosalData(this.userDataProvider.getUserData())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodigoqrPage');
  }

  createCode() {
    this.createdCode = this.qrData;
  }

}
