import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ContactoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacto',
  templateUrl: 'contacto.html',
})
export class ContactoPage {

  public contactosData:any;
  private loading:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController) 
  {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    this.loading.present();
    this.getContactosData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactoPage');
  }

  getContactosData()
  {
    this.restProvider.getContactosData()
      .then(data => {
        console.log(data);
        this.contactosData = data;
        
        this.contactosData.forEach(element => {
          let direction = element.direccion.split(' ');
          element.directionCode = direction.join('+');
        });
        this.loading.dismiss();

      })
      .catch(err => {
        console.log(err);
      });
  }

}
