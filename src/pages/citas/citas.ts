import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { RestProvider } from '../../providers/rest/rest';
import { HelpersProvider } from '../../providers/helpers/helpers';

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

  dateToday:string;

  dateTomorrow:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userDataProvider: UserdataProvider,
    public alertCtrl: AlertController,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public helpers: HelpersProvider) 
  {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando citas...'
    });

    this.loading.present();

    var data = new Date();
    var monthT = data.getMonth()+1 < 10 ? '0'+(data.getMonth()+1) : (data.getMonth()+1);
    var dayT = data.getDate() < 10 ? '0'+(data.getDate()) : (data.getDate());
    this.dateToday = data.getFullYear()+'-'+monthT +'-'+dayT;

    console.log(this.dateToday);

    var date = new Date();
    date.setDate(date.getDate()+1);
    var month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
    var day = date.getDate() < 10 ? '0'+(date.getDate()) : (date.getDate());
    this.dateTomorrow = date.getFullYear()+'-'+month +'-'+day;

    console.log(this.dateTomorrow);

    console.log(this.dateToday);
    this.showPage = this.userDataProvider.getUserDataReay();
    this.getCitas(this.userDataProvider.getUserId());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CitasPage');
  }

  getCitas(userId)
  {
    this.restProvider.getCitasData(userId)
      .then( data => {
        this.citas = data;
        console.log(this.citas);
        //this.citas.reverse();
        this.dateFormat(this.citas);
        this.loading.dismiss();
      })
      .catch( err => {
         console.log(err);
      });
  }

  dateFormat(citas:any)
  {
    citas.forEach(cita => {
      let fecha:string = cita.fecha;
      
      cita.dateFormated = this.helpers.dateFormat(fecha);
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
            this.loading = this.loadingCtrl.create({
              content: 'Actualizando cita...'
            });
            this.loading.present();
            this.updateEstadoCitaConfirmada(cita, true)
          }
        }
      ]
    });
    confirm.present();
  }

  updateEstadoCitaConfirmada(cita, estado)
  {
    console.log(cita);
    this.restProvider.updateEstadoCita(cita.id, estado)
      .then( data => {
        //cita = data;
        cita.estado = 'true';
        
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
            this.loading = this.loadingCtrl.create({
              content: 'Actualizando cita...'
            });
            this.loading.present();
            this.updateEstadoCitaReprogramada(cita, 'REPROGRAMADA')
          }
        }
      ]
    });
    confirm.present();
  }

  updateEstadoCitaReprogramada(cita, estado)
  {
    var cita:any;
    this.restProvider.updateEstadoCita(cita.id, estado)
      .then( data => {
        cita.estado = 'REPROGRAMADA';
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
