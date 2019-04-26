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
  }

  leerCodigo() 
  {
    // Pedir permiso de utilizar la camara
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // el permiso fue otorgado
        // iniciar el escaneo
        let scanSub = this.qrScanner.scan().subscribe((data: string) => {        

          if (data.split('.')[0] == 'pay-pack') {
            let secretariaId = this.userDataProvider.getUserId();
            let datos = {
              id_pack : data.split('.')[1],
              user_id: data.split('.')[4]
            }

            this.restProvider.payPackUser(secretariaId, datos)
            .then(data => {
              console.log(data);
              this.showMessageSuccess('Listo! ');
            })
            .catch(err=> {
              console.log(err);
            });

          } else {
            var usersData = {
              'user_id': data.split('.')[1],
              'points': data.split('.')[0],
              'user_id_origin': data.split('.')[3]
            };
  
            this.loading = this.loadingCtrl.create({
              content: 'Transfiriendo puntos...'
            });
            this.loading.present();
  
            let userId = this.userDataProvider.getUserId();
            this.updataPoints(userId, usersData); 
  
            this.qrScanner.hide(); // esconder el preview de la camara
            scanSub.unsubscribe(); // terminar el escaneo
          }
          
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

  updataPoints(userId:number, data:any)
  {
    this.restProvider.updateUserPoints(userId, data)
      .then( resp => {
        console.log(resp);

        this.loading.dismiss();
        this.showMessageSuccess('listo');
      })
      .catch( err => {
        console.log(err);
      });
  }

  showMessageSuccess(message:any) 
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

  ionViewWillEnter()
  {
     this.showCamera();
  }

  ionViewWillLeave()
  {
     this.hideCamera(); 
  }

  ionViewDidLoad() 
  {
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

  showCamera() 
  {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() 
  {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }
}
