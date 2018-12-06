import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserdataProvider } from '../../providers/userdata/userdata';

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

  qrData:any = null;

  createdCode:any = null;
  
  scannedCode:any = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userDataProvider: UserdataProvider,
  ) 
  {
    this.puntos = this.navParams.get('puntos');
    this.userId = this.userDataProvider.getUserId();
    this.qrData = this.puntos + '.' + this.userId;
    console.log(this.qrData);
    this.createCode()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodigoqrPage');
  }

  createCode() {
    this.createdCode = this.qrData;
  }

}
