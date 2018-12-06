import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { WelcomePage } from '../welcome/welcome';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  firstName:string = '';
  lastName:string = '';
  username:string = '';
  email:string = '';
  password:string = '';
  loading:any;
  userData:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,     
    public restProvider: RestProvider,
    ) 
  {
    this.loading = this.loadingCtrl.create({
      content: 'Registrando usuario...'
    });
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad SignupPage');
  }

  registerUserWordPress()
  { 
    var data = {
      'username': this.username,
      'email': this.email,
      'password': this.password,
      'first_name': this.firstName,
      'last_name': this.lastName,
    }

    this.restProvider.registerUserWordPress(data)
      .then( data => {
        
        this.userData = data;
        console.log(data);
        this.loading.dismiss();
        
        if (this.userData.code != 200) {
          this.loading = this.loadingCtrl.create({
            content: 'Registrando usuario...'
          });

          this.showAlert(this.userData.error.message);

          console.log(this.userData.error.message);
        } else if (this.userData.code == 200) {
          this.showMessageSuccess('Te has registrado correctamente.');
        }

      })
      .catch(err => {
        console.log(err);  
      });
  }

  signUp()
  {
    if ( this.firstName === '' || 
         this.lastName === '' || 
         this.username === '' || 
         this.email === '' || 
         this.password === '' ) {

      this.showAlert('Todos los campos son obligatorios.');

    } else if (this.hasWhitespace(this.username) ) { 

      this.showAlert('El nombre de usuario no puede contener espacios en blanco.');

    } else if (this.validateEmail(this.email) != true){

      this.showAlert('Introduce un email correcto.');

    } else if ( this.password.length < 8 || this.hasWhitespace(this.password)) {

      this.showAlert('El password debe tener 8 caracteres o mas y no puede contener espacios en blanco.');

    } else {

      this.loading.present();

      console.log(this.firstName);
      console.log(this.lastName);
      console.log(this.username);
      console.log(this.email);
      console.log(this.password);

      this.registerUserWordPress();
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
            this.navCtrl.setRoot(WelcomePage);
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

  validateEmail(mail) 
  {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
  }

  hasWhitespace( str ) {
    return str.search(" ") != -1;
  }

}
