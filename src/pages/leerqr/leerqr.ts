import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { RestProvider } from '../../providers/rest/rest';
import { UserdataProvider } from '../../providers/userdata/userdata';

/**
 * Generated class for the LeerqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leerqr',
  templateUrl: 'leerqr.html',
})
export class LeerqrPage {

  dataUser:any;

  loading:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private qrScanner: QRScanner,
    public alertCtrl: AlertController,
    public restProvider: RestProvider,
    public userDataProvider: UserdataProvider,
    public loadingCtrl: LoadingController
    ) 
  {
    this.loading = this.loadingCtrl.create({
      content: 'Transfiriendo puntos...'
    });
  }

  restPoints(userId, points)
  {
    this.loading.present();

    this.restProvider.getWordpressUserData(userId)
      .then( data => { 
        this.dataUser = data;
        var newPoints = parseInt(this.dataUser.user_points) - parseInt(points);

        var dataPoints = {'user_points':newPoints};

        this.restProvider.updateUserPoints(userId, dataPoints)
          .then( data => {
            this.addPoints(userId, points);
          })
          .catch(err => {
            console.log(err);  
        });
      })
      .catch(err => {
        console.log(err);  
      });

  }

  addPoints(userIdOrigin, points)
  {
    var pointsUpdated = parseInt(this.userDataProvider.getUserData().user_points) + parseInt(points);
    var dataPoints = {
      'user_points':pointsUpdated, 
      'user_id_origin':userIdOrigin,
      'points':points
    };

    this.restProvider.updateUserPoints(this.userDataProvider.getUserId(), dataPoints)
      .then( data => {
        this.loading.dismiss();
        this.loading = this.loadingCtrl.create({
          content: 'Transfiriendo puntos...'
        });
        this.showMessageSuccess('Puntos transferidos.');
      })
      .catch(err => {
        console.log(err);  
      });

    //var data = {'user_points':points}
    //this.restProvider.updateUserPoints(userId, data)
  }

  showMessageSuccess(message:string) 
  {
    const alert = this.alertCtrl.create({
      title: 'Listo!',
      subTitle: message,
      buttons: ['OK']
    });

    alert.setCssClass('alert-error');
    alert.present();

    console.log(alert);
  }

  ionViewWillEnter(){
     this.showCamera();
  }
  ionViewWillLeave(){
     this.hideCamera(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeerqrPage');
  }

  showAlert(message) 
  {
    const alert = this.alertCtrl.create({
      title: 'Mensaje!',
      subTitle: message,
      buttons: ['OK']
    });

    alert.setCssClass('alert-error');
    alert.present();

    console.log(alert);
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  leerCodigo() {

  // Pedir permiso de utilizar la camara
  this.qrScanner.prepare().then((status: QRScannerStatus) => {
    if (status.authorized) {
      // el permiso fue otorgado
      // iniciar el escaneo
      let scanSub = this.qrScanner.scan().subscribe((data: string) => {
        
        var userId = data.split('.')[1];
        var points = data.split('.')[0];
        this.restPoints(userId, points)
        
        this.qrScanner.hide(); // esconder el preview de la camara
        scanSub.unsubscribe(); // terminar el escaneo
      }); 

      this.qrScanner.show();

    } else if (status.denied) {
      this.showAlert('denied');
      // el permiso no fue otorgado de forma permanente
      // debes usar el metodo QRScanner.openSettings() para enviar el usuario a la pagina de configuracion
      // desde ahí podrán otorgar el permiso de nuevo
    } else {
      // el permiso no fue otorgado de forma temporal. Puedes pedir permiso de en cualquier otro momento
    }
  }) .catch((e: any) =>this.showAlert('El error es: '+ e));

}

}
