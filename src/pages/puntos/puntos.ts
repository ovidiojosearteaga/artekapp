import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { PaquetePage } from '../paquete/paquete';
import { CodigoqrPage } from '../codigoqr/codigoqr';
import { UserlistPage } from '../userlist/userlist';
import { LeerqrPage } from '../leerqr/leerqr';

/**
 * Generated class for the PuntosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-puntos',
  templateUrl: 'puntos.html',
})
export class PuntosPage {

  showPage:boolean = false;

  paquetes:any = null;

  data:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider,
    public userDataProvider: UserdataProvider,
    public alertCtrl: AlertController,
  ) 
  {
    //this.userDataProvider.getUserId();
    this.getPaquetesArtek();
    this.showPage = this.userDataProvider.getUserDataReay();
  }

  ionViewDidLoad() 
  {
  }

  leerPuntosQr()
  {
    this.navCtrl.push(LeerqrPage);
  }

  showPrompt() 
  {
    const prompt = this.alertCtrl.create({
      title: 'Puntos a transferir',
      message: "Introduce los puntos a transferir.",
      inputs: [
        {
          name: 'puntos',
          placeholder: 'Puntos',
          type: 'number',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Transferir',
          handler: data => {

            if (data.puntos === '') {
              this.showAlert(
                'Introduce un número valido...',
                );
            } else if ( parseInt(data.puntos) > this.userDataProvider.getUserData().user_points ) {
              this.showAlert(
                'Los puntos a transferir no pueden ser mayor a tus puntos disponibles: ' + 
                this.userDataProvider.getUserData().user_points
                );
            } else if (parseInt(data.puntos) <= 0) {
              this.showAlert(
                'Los puntos a transferir no pueden ser menor o igual a 0'
                );
            } else {
              this.navCtrl.push(CodigoqrPage, {
                puntos : data.puntos,
              });  
            }   
          }
        }
      ]
    });
    prompt.present();
  }

  showAlert(message:string) 
  {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: message,
      buttons: ['OK']
    });

    alert.setCssClass('alert-error');
    alert.present();

    console.log(alert);
  }

  getPaquetesArtek()
  {
    this.restProvider.getWordpressCPT('paquete_artek')
      .then( data => {

        this.paquetes = data;

        this.paquetes.forEach(element => {
          element.featureMediaUrl = "../assets/imgs/loading-image.gif";
        });

        this.paquetes.forEach(element => {
          this.getWordPressMediaById(element.featured_media, element.id);
        });
      })
      .catch(
        err => {
          console.log(err);  
      });
  }

  getWordPressMediaById(idMedia:number, idNotice:number)
  {
    this.restProvider.getWordPressMediaById(idMedia)
    .then(
      data => {
        var that = this;
        that.data = data;
        this.paquetes.forEach(function(element){
          if (element.id === idNotice) {
            element.featureMediaUrl = that.data.source_url;
          }
        })
      }
    )
    .catch(
      err => {
        console.log(err);
      }
    );
  }

  viewPaquete(paquete)
  {
    this.navCtrl.push(PaquetePage, {
      paqueteId: paquete.id
    });
  }

  goToUserList()
  {
    this.navCtrl.push(UserlistPage);
  }

}
