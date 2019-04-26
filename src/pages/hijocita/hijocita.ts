import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the HijocitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hijocita',
  templateUrl: 'hijocita.html',
})
export class HijocitaPage {
  
  public citas:any;
  public dateToday:string;
  public wpId:number;
  public loading:any;
  public cedula:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public helpers: HelpersProvider
  ) {

    this.loading = this.loadingCtrl.create({
      content: 'Cargando citas...'
    });
    this.loading.present();
    
    this.cedula = this.navParams.get('cedula');
    this.wpId = this.navParams.get('wp_id');

    var data = new Date();
    var month = data.getMonth()+1 < 10 ? '-0'+(data.getMonth()+1) : '-'+(data.getMonth()+1);
    var day = data.getDate()+1 < 10 ? '-0'+(data.getDate()+1) : '-'+(data.getDate()+1);
    this.dateToday = data.getFullYear()+''+month +''+day;

    this.getCitas(this.wpId);
  }

  getCitas(userId:number)
  {
    this.restProvider.getCitasData(userId)
      .then( data => {
        console.log(data);
        this.citas = data;
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
            this.updateEstadoCitaReprogramada(cita, 'reprogramada')
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
        cita.estado = 'reprogramada';
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

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HijocitaPage');
  }

}
