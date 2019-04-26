import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { PaqueteqrPage } from '../paqueteqr/paqueteqr';

/**
 * Generated class for the PaquetePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paquete',
  templateUrl: 'paquete.html',
})
export class PaquetePage {

  paqueteId:number;

  paqueteData:any = null;

  showPaqueteData:boolean = false;

  featureImageData:any;

  loading:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider,
    public userDataProvider: UserdataProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, 
  ) 
  {
    this.paqueteId = this.navParams.get('paqueteId');
    this.getPaqueteData(this.paqueteId);

    this.loading = this.loadingCtrl.create({
      content: 'Procesando...'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaquetePage');
  }

  getPaqueteData(paqueteId)
  {
    var that = this;
    this.restProvider.getWordPressUniqueCPT('paquete_artek', paqueteId)
      .then(
        data => {
          that.paqueteData = data;
          this.paqueteData.featureMediaUrl = "../assets/imgs/loading-image.gif";
          this.getWordPressMediaById(that.paqueteData.featured_media);
          this.showPaqueteData = true;
        })
      .catch(
        err => {
          console.log(err);
      }
    );
  }

  getWordPressMediaById(idMedia:number)
  {
    var that = this;
    this.restProvider.getWordPressMediaById(idMedia)
    .then(
      data => {
        that.featureImageData = data;
        this.paqueteData.featureMediaUrl = that.featureImageData.source_url;
    })
    .catch(
      err => {
        console.log(err);
    });
  }

  pagarPaquete()
  {
    if(parseInt(this.userDataProvider.getUserData().user_points) < parseInt(this.paqueteData.value_points)) {
      this.showAlert('No tienes puntos suficientes para pagar este paquete.');
    } else {
      this.showConfirm();
    }
  }

  showMessageSuccess(message:string) 
  {
    const alert = this.alertCtrl.create({
      title: 'Listo!',
      subTitle: message,
      buttons: [
        {
          text: 'Entrar',
          handler: () => {
            this.navCtrl.push(PaqueteqrPage);
          }
        },
      ]
    });

    alert.setCssClass('alert-error');
    alert.present();

    console.log(alert);
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

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Confirmar',
      message: '¿Deseas pagar este paquete, por un valor de '+this.paqueteData.value_points+' puntos?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: () => {
            //this.actualizarPuntos();
            this.createQrPayPoints();
          }
        }
      ]
    });
    confirm.present();
  }

  createQrPayPoints()
  {
    this.navCtrl.push(PaqueteqrPage, {
      'namePaquete':this.paqueteData.slug,
      'idPaquete':this.paqueteData.id,
      'valuePaquete':this.paqueteData.value_points
    });
  }

  actualizarPuntos()
  {
    this.loading.present();

    var userPoints = parseInt(this.userDataProvider.getUserData().user_points) - parseInt(this.paqueteData.value_points);
    var data = {'user_points': userPoints};

    this.restProvider.updateUserPoints(this.userDataProvider.getUserId(), data)
      .then( data => {

        this.userDataProvider.getUserData().user_points = userPoints;
        this.loading.dismiss();
        this.loading = this.loadingCtrl.create({
          content: 'Procesando...'
        });

        this.navCtrl.push(PaqueteqrPage, {
          'namePaquete':this.paqueteData.slug,
          'idPaquete':this.paqueteData.id,
          'valuePaquete':this.paqueteData.value_points
        });
      })
      .catch(err => {
        console.log(err);  
      });
  }  

}
