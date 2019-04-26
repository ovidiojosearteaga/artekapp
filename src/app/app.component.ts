import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CitasPage } from '../pages/citas/citas';
import { ContactoPage } from '../pages/contacto/contacto';
import { NoticiasPage } from '../pages/noticias/noticias';
import { NoticiaPage } from '../pages/noticia/noticia';
import { PuntosPage } from '../pages/puntos/puntos';
import { WelcomePage } from '../pages/welcome/welcome';
import { MisdatosPage } from '../pages/misdatos/misdatos'; 
import { MishijosPage } from '../pages/mishijos/mishijos';
import { UserdataProvider } from '../providers/userdata/userdata';
import { OneSignal } from '@ionic-native/onesignal'; 

import { PersonaldataProvider } from '../providers/personaldata/personaldata';
import { StoragenoticeProvider } from '../providers/storagenotice/storagenotice';

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
    private oneSignal: OneSignal,
    public personalData: PersonaldataProvider,
    public storageNotice: StoragenoticeProvider) 
  {
    this.initializeApp();

    this.pages = [
      { title: 'Mis Puntos', component: PuntosPage, icon: 'ios-create' },
      { title: 'Mis Citas', component: CitasPage, icon: 'clipboard' },
      { title: 'Mis hijos', component: MishijosPage, icon: 'log-out' },
      { title: 'Noticias', component: NoticiasPage, icon: 'link' },
      { title: 'Mis datos', component: MisdatosPage, icon: 'body' },
      { title: 'Contactos', component: ContactoPage, icon: 'contacts'},
      { title: 'Salir', component: 'salir', icon: 'log-out' },
    ];

    this.loading = this.loadingCtrl.create({
      content: 'Saliendo de Artek.'
    });

    this.storageNotice.deleteIdNotice();

    //this.handlerNotifications();
  }

  private handlerNotifications(){
    this.oneSignal.startInit('b94c5296-d9d9-4589-a89d-76fb3ee51c68', '823613585646');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData => {

      if (jsonData.notification.payload.additionalData.push_type == 'notice') {
        this.storageNotice.setIdNotice(jsonData.notification.payload.additionalData.id_notice);
      
        this.personalData.havePersonalData().then(result => { 
          if (result !== undefined) {
            this.viewNotice(jsonData.notification.payload.additionalData.id_notice);
          
          } else {
            let alert = this.alertCtrl.create({
              title: '',
              subTitle: 'Debes estar logueado para ver esta noticia.',
              buttons: ['OK']
            });
            alert.present();
          }
        });
    }

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
            this.loading = this.loadingCtrl.create({
              content: 'Saliendo de Artek App.'
            });
            this.loading.present();
            this.personalData.deletePersonalData();
            this.personalData.deletePersonalToken();
            this.nav.setRoot(WelcomePage); 
            this.loading.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }

  viewNotice(IdNotice: any)
  {
    this.nav.push(NoticiaPage, {
      noticeId: IdNotice
    });
  }

}
