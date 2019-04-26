import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { CitasPage} from '../pages/citas/citas';
import { ContactoPage} from '../pages/contacto/contacto';
import { NoticiasPage} from '../pages/noticias/noticias';
import { NoticiaPage} from '../pages/noticia/noticia';
import { PuntosPage} from '../pages/puntos/puntos';
import { SignupPage} from '../pages/signup/signup';
import { WelcomePage} from '../pages/welcome/welcome';
import { PaquetePage } from '../pages/paquete/paquete';
import { CodigoqrPage } from '../pages/codigoqr/codigoqr';
import { UserlistPage } from '../pages/userlist/userlist';
import { PaqueteqrPage } from '../pages/paqueteqr/paqueteqr';
import { MisdatosPage} from '../pages/misdatos/misdatos';
import { LeerqrPage } from '../pages/leerqr/leerqr';
import { MishijosPage} from '../pages/mishijos/mishijos';
import { HijocitaPage } from '../pages/hijocita/hijocita';
import { SecretariaPage } from '../pages/secretaria/secretaria';

import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { UserdataProvider } from '../providers/userdata/userdata';

import { NgxQRCodeModule } from 'ngx-qrcode2';//comentar 
import { UserlistProvider } from '../providers/userlist/userlist';

import { Camera } from '@ionic-native/camera';
import { OneSignal } from '@ionic-native/onesignal';
import { QRScanner } from '@ionic-native/qr-scanner';
import { HelpersValidatorProvider } from '../providers/helpers-validator/helpers-validator';
import { PersonaldataProvider } from '../providers/personaldata/personaldata';

import { IonicStorageModule } from '@ionic/storage';
import { StoragenoticeProvider } from '../providers/storagenotice/storagenotice';
import { HelpersProvider } from '../providers/helpers/helpers';

@NgModule({
  declarations: [
    MyApp,
    //Comentar todas las paginas
    /*CitasPage,
    ContactoPage,
    NoticiasPage,
    NoticiaPage,
    PuntosPage,
    SignupPage,
    WelcomePage,
    PaquetePage,
    CodigoqrPage,
    UserlistPage,
    PaqueteqrPage,
    MisdatosPage,
    LeerqrPage,
    MishijosPage,
    HijocitaPage,
    SecretariaPage
    */
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    NgxQRCodeModule, //Comentar
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CitasPage,
    ContactoPage,
    NoticiasPage,
    NoticiaPage,
    PuntosPage,
    SignupPage,
    WelcomePage,
    PaquetePage,
    CodigoqrPage,
    UserlistPage,
    PaqueteqrPage,
    MisdatosPage,
    LeerqrPage,
    MishijosPage,
    HijocitaPage,
    SecretariaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    QRScanner, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    UserdataProvider,
    UserlistProvider,
    HelpersValidatorProvider,
    PersonaldataProvider,
    StoragenoticeProvider,
    HelpersProvider,
    Camera,
  ]
})
export class AppModule {}
