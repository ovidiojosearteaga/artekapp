import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaqueteqrPage } from './paqueteqr';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    PaqueteqrPage,
  ],
  imports: [
    IonicPageModule.forChild(PaqueteqrPage),
    NgxQRCodeModule,
  ],
})
export class PaqueteqrPageModule {}
