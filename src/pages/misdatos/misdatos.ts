import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserdataProvider } from '../../providers/userdata/userdata';

/**
 * Generated class for the MisdatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-misdatos',
  templateUrl: 'misdatos.html',
})
export class MisdatosPage {

  firstName:string;
  lastName:string;
  email:string;
  password:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userDataProvider: UserdataProvider) {

    this.firstName = this.userDataProvider.getUserData().firstname;
    this.lastName = this.userDataProvider.getUserData().lastname;
    this.email = this.userDataProvider.getUserData().email;

    console.log(this.userDataProvider.getUserData());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisdatosPage');
  }

}
