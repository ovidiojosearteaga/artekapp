import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserdataProvider } from '../../providers/userdata/userdata';

import { HijocitaPage } from '../hijocita/hijocita';

/**
 * Generated class for the MishijosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mishijos',
  templateUrl: 'mishijos.html',
})
export class MishijosPage {

  public hijos:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public Userdata: UserdataProvider) {

    this.hijos = Userdata.getUserData().hijos;  
  }

  goToCitas(cedula:number, wpId:number)
  {
    this.navCtrl.push(HijocitaPage, {cedula: cedula, wp_id:wpId});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MishijosPage');
  }



}
