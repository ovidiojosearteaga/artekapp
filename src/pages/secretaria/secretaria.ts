import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HelpersProvider } from '../../providers/helpers/helpers';

import { LoadingController, AlertController } from 'ionic-angular';
import { PersonaldataProvider } from '../../providers/personaldata/personaldata';
import { WelcomePage } from '../../pages/welcome/welcome';
import { LeerqrPage } from '../../pages/leerqr/leerqr';

import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the SecretariaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-secretaria',
  templateUrl: 'secretaria.html',
})
export class SecretariaPage {

  loading:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public helpersProvider: HelpersProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public personalData: PersonaldataProvider,
    public restProvider: RestProvider) {

      this.restPoints();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecretariaPage');
  }

  goToLeerQR()
  {
    this.navCtrl.push(LeerqrPage);
  }

  salir()
  {
    const confirm = this.alertCtrl.create({
      title: 'Salir',
      message: '¿Deseas Salir de artek?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Sí',
          handler: () => {
            this.loading = this.loadingCtrl.create({
              content: 'Saliendo de Artek App.'
            });
            this.loading.present();
            this.personalData.deletePersonalData();
            this.personalData.deletePersonalToken();
            this.navCtrl.setRoot(WelcomePage); 
            this.loading.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }

  restPoints()
  {
    console.log('obteniendo datos del usuario');
    this.restProvider.getWordpressUserData(258)
      .then( (data) => {
        console.log(data);
      });
  }

}
