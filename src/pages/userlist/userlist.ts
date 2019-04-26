import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { FormControl }  from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { CodigoqrPage } from '../codigoqr/codigoqr';

import { PersonaldataProvider } from '../../providers/personaldata/personaldata';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

/**
 * Generated class for the UserlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userlist',
  templateUrl: 'userlist.html',
})
export class UserlistPage {

  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching:boolean = false;
  showListAlphabetical:boolean = true;
  userToAddPoints:number;
  currentPointsofUser:number;
  loading:any;
  dataUser:any;
  pacientes:any;
  currentUser:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider,
    public userDataProvider: UserdataProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public personalData: PersonaldataProvider
  ) 
  {
    this.loading = this.loadingCtrl.create({
      content: 'Transfiriendo puntos...'
    });

    this.getPacientes();
    this.searchControl = new FormControl();
  }

  getPacientes()
  {
    let loading = this.loadingCtrl.create({
      content: 'Cargando lista de usuarios...'
    });

    loading.present();

    this.restProvider.getPacientes()
      .then( data => {
        this.pacientes = data;

          this.pacientes.forEach(function(paciente) {
            if (paciente.user_avatar == false)
              paciente.user_avatar = "assets/imgs/user-default.jpg";
          });

        console.log(this.pacientes);
        loading.dismiss();
      
      })
      .catch(
        err => {
          console.log(err);  
      });
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(700).subscribe( search => {
      this.searching = false;
      if (this.searchTerm != '') {
        this.showListAlphabetical = false;
        this.setFilteredItems();
      } else {
        this.items = null;
        this.showListAlphabetical = true;
      }
    });
  }

  onSearchInput()
  {
    this.searching = true;
  }

  setFilteredItems()
  {
    this.items = this.filterItems(this.searchTerm);
  }

  showPrompt(userToSendPoints) 
  {
    const prompt = this.alertCtrl.create({
      title: 'Puntos a transferir',
      message: "Introduce los puntos a transferir a "+userToSendPoints.display_name,
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

              this.createQRToSendPoints(userToSendPoints, data.puntos);
            }   
          }
        }
      ]
    });
    prompt.present();
  }

  createQRToSendPoints(userToSendPoints:any, points:number)
  {
    this.personalData.getPersonalData()
      .then((data) => 
      {
        this.currentUser = data;

        console.log(this.currentUser);
        this.loading.dismiss();
        this.navCtrl.push(CodigoqrPage, {
          puntos : points,
          user_id: userToSendPoints.ID,
          user_display_name: userToSendPoints.display_name,
          user_cedula: userToSendPoints.cedula,
          type: 'trasnfer_to_user',
          user_id_origin: this.currentUser.id,
          user_cedula_origin: this.currentUser.slug
        });  
      })
      .catch((err) => 
      { 
        console.log(err); 
      }
    );    
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

  filterItems(searchTerm) 
  {
    return this.pacientes.filter((item) => {
      return item.display_name.toLowerCase()
      .indexOf(
        searchTerm.toLowerCase()) > -1 || 
          String(item.cedula)
            .indexOf(searchTerm) > -1; 
    });
  }
}
