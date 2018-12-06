import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CitasPage } from '../pages/citas/citas';
import { ContactoPage } from '../pages/contacto/contacto';
import { NoticiasPage } from '../pages/noticias/noticias';
import { PuntosPage } from '../pages/puntos/puntos';
import { WelcomePage } from '../pages/welcome/welcome';
import { MisdatosPage } from '../pages/misdatos/misdatos'; 

import { UserdataProvider } from '../providers/userdata/userdata';

import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;

  loading: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userDataProvider: UserdataProvider,
    private oneSignal: OneSignal) 
  {
    this.initializeApp();

    this.pages = [
      { title: 'Mis Puntos', component: PuntosPage, icon: 'ios-create' },
      { title: 'Mis Citas', component: CitasPage, icon: 'clipboard' },
      { title: 'Noticias', component: NoticiasPage, icon: 'link' },
      { title: 'Mis datos', component: MisdatosPage, icon: 'body' },
      { title: 'Salir', component: 'salir', icon: 'log-out' },
    ];

    this.loading = this.loadingCtrl.create({
      content: 'Saliendo de Artek.'
    });

    //this.handlerNotifications();
  }

  private handlerNotifications(){
    this.oneSignal.startInit('b94c5296-d9d9-4589-a89d-76fb3ee51c68', '823613585646');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData => {
      let alert = this.alertCtrl.create({
        title: jsonData.notification.payload.title,
        subTitle: jsonData.notification.payload.body,
        buttons: ['OK']
      });
      alert.present();
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
    this.oneSignal.endInit();

    this.oneSignal.getIds().then((id) => {
      this.userDataProvider.setOneSignalId(id);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.component === 'salir') {
      this.salirArtek();
    } else {
      this.nav.setRoot(page.component);  
    }
  }

  salirArtek()
  {
    const confirm = this.alertCtrl.create({
      title: 'Salir',
      message: '¿Deseas Salir de artek?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Sí',
          handler: () => {
            this.loading.present();
            this.nav.setRoot(WelcomePage); 
            this.loading.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }
}
