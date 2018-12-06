import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.namePaquete = this.navParams.get('namePaquete');
    this.idPaquete = this.navParams.get('idPaquete');
    this.valuePaquete = this.navParams.get('valuePaquete');

    this.qrCode = this.idPaquete+'.'+this.namePaquete+'.'+this.valuePaquete;

    this.showQR = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaqueteqrPage');
  }

}
