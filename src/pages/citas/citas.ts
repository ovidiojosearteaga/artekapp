import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the CitasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html',
})
export class CitasPage {

  showPage:boolean = false;

  citas:any = [];

  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userDataProvider: UserdataProvider,
    public alertCtrl: AlertController,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController) 
  {
    this.showPage = this.userDataProvider.getUserDataReay();
    this.getCitas(this.userDataProvider.getUserId());

    this.loading = this.loadingCtrl.create({
      content: 'Procesando...'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CitasPage');
  }

  getCitas(userId)
  {
    this.restProvider.getCitasData(userId)
      .then( data => {
        this.citas = data;
      })
      .catch( err => {
         console.log(err);
      });
  }

  confirmarCita(cita)
  {
    const confirm = this.alertCtrl.create({
      title: 'Confirmar',
      message: '¿Deseas confirmar esta cita? <p>'+cita.title+'</p><p>'+cita.fecha+' - '+cita.hora  +'</p>',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Sí',
          handler: () => {
            this.loading.present();
            this.updateEstadoCitaConfirmada(cita.id, 'confirmada')
          }
        }
      ]
    });
    confirm.present();
  }

  cancelarCita(cita)
  {
    const confirm = this.alertCtrl.create({
      title: 'Cancelar',
      message: '¿Deseas cancelar esta cita? <p>'+cita.title+'</p><p>'+cita.fecha+' - '+cita.hora  +'</p>',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Sí',
          handler: () => {
            this.loading.present();
            this.updateEstadoCitaCancelada(cita.id, 'cancelada')
          }
        }
      ]
    });
    confirm.present();
  }

  reprogramarCita(cita)
  {
    const confirm = this.alertCtrl.create({
      title: 'Reprogramar',
      message: '¿Deseas reprogramar esta cita? <p>'+cita.title+'</p>',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Sí',
          handler: () => {
            this.loading.present();
            this.updateEstadoCitaReprogramada(cita.id, 'reprogramada')
          }
        }
      ]
    });
    confirm.present();
  }

  updateEstadoCitaReprogramada(citaId, estado)
  {
    var cita:any;
    this.restProvider.updateEstadoCita(citaId, estado)
      .then( data => {
        cita = data;

        this.citas.forEach(function(element){
          if (element.id == cita.ID)
            element.estado = cita.estado; 
        });
        this.loading.dismiss();

        this.loading = this.loadingCtrl.create({
          content: 'Procesando...'
        });

        this.showAlert('Se ha enviado tu solicitud de reprogramar esta cita.');

      })
      .catch( err => {
        console.log(err);
      });
  }

  updateEstadoCitaCancelada(citaId, estado)
  {
    var cita:any;
    this.restProvider.updateEstadoCita(citaId, estado)
      .then( data => {
        cita = data;

        this.citas.forEach(function(element){
          if (element.id == cita.ID)
            element.estado = cita.estado; 
        });
        this.loading.dismiss();

        this.loading = this.loadingCtrl.create({
          content: 'Procesando...'
        });

        this.showAlert('Tu cita ha sido cancelada.');

      })
      .catch( err => {
        console.log(err);
      });
  }

  updateEstadoCitaConfirmada(citaId, estado)
  {
    var cita:any;
    this.restProvider.updateEstadoCita(citaId, estado)
      .then( data => {
        cita = data;

        this.citas.forEach(function(element){
          if (element.id == cita.ID)
            element.estado = cita.estado; 
        });
        this.loading.dismiss();

        this.loading = this.loadingCtrl.create({
          content: 'Procesando...'
        });

        this.showAlert('Tu cita ha sido confirmada.');

      })
      .catch( err => {
        console.log(err);
      });
  }

  showAlert(message:string) 
  {
    const alert = this.alertCtrl.create({
      title: 'Listo!',
      subTitle: message,
      buttons: ['OK']
    });

    alert.setCssClass('alert-error');
    alert.present();

  }


}
