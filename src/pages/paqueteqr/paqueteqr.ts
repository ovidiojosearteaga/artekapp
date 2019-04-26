import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserdataProvider } from '../../providers/userdata/userdata';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the PaqueteqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paqueteqr',
  templateUrl: 'paqueteqr.html',
})
export class PaqueteqrPage {

  namePaquete:string;
  
  idPaquete:number;
  
  valuePaquete:number;
  
  qrCode:any = null;

  showQR = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userData: UserdataProvider,
    public restProvider: RestProvider) {

    this.namePaquete = this.navParams.get('namePaquete');
    this.idPaquete = this.navParams.get('idPaquete');
    this.valuePaquete = this.navParams.get('valuePaquete');

    this.qrCode = 'pay-pack.'+this.idPaquete+'.'+this.namePaquete+'.'+this.valuePaquete+'.'+this.userData.getUserId();

    console.log(this.qrCode);

    this.showQR = true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaqueteqrPage');
  }

}
