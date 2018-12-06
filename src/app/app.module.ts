import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
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

import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { UserdataProvider } from '../providers/userdata/userdata';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { UserlistProvider } from '../providers/userlist/userlist';

import { OneSignal } from '@ionic-native/onesignal';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@NgModule({
  declarations: [
    MyApp,
    //HomePage,
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //HomePage,
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    QRScanner, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    UserdataProvider,
    UserlistProvider
  ]
})
export class AppModule {}
