import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UserdataProvider } from '../../providers/userdata/userdata';
import { UserlistProvider } from '../../providers/userlist/userlist';
import { FormControl }  from '@angular/forms';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

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
  userIdToAddPoints:number;
  currentPointsofUser:number;
  loading:any;
  dataUser:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider,
    public userList: UserlistProvider,
    public userDataProvider: UserdataProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) 
  {
    console.log(this.items);

    this.loading = this.loadingCtrl.create({
      content: 'Transfiriendo puntos...'
    });

    this.userList.getPacientes();

    this.searchControl = new FormControl();
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
    this.items = this.userList.filterItems(this.searchTerm);
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
              this.userIdToAddPoints = userToSendPoints.ID;
              this.restPoints(this.userDataProvider.getUserId(),data.puntos);
              /*
              this.navCtrl.push(CodigoqrPage, {
                puntos : data.puntos,
              });  
              */
            }   
          }
        }
      ]
    });
    prompt.present();
  }

  addPoints(userId, points)
  {
    this.restProvider.getWordpressUserData(userId)
    .then( data => { 

      this.dataUser = data;
      var newPoints = parseInt(this.dataUser.user_points) + parseInt(points);

      var dataPoints = {
        'user_points':newPoints, 
        'user_id_origin':this.userDataProvider.getUserId(),
        'points':points
      };

      this.restProvider.updateUserPoints(userId, dataPoints)
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

     })
    .catch(err => {
      console.log(err);  
    });

    //var data = {'user_points':points}
    //this.restProvider.updateUserPoints(userId, data)
  }

  restPoints(userId, points)
  {
    this.loading.present();

    var pointsUpdated = this.userDataProvider.getUserData().user_points - points;

    var data = {'user_points':pointsUpdated};

    this.restProvider.updateUserPoints(userId, data)
      .then( data => {
        this.userDataProvider.getUserData().user_points = pointsUpdated;
        this.addPoints(this.userIdToAddPoints, points);
      })
      .catch(err => {
        console.log(err);  
    });
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
}
