import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodigoqrPage } from './codigoqr';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    CodigoqrPage,
  ],
  imports: [
    IonicPageModule.forChild(CodigoqrPage),
    NgxQRCodeModule,
  ],
})
export class CodigoqrPageModule {}
