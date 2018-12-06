import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PuntosPage } from './puntos';

@NgModule({
  declarations: [
    PuntosPage,
  ],
  imports: [
    IonicPageModule.forChild(PuntosPage),
  ],
})
export class PuntosPageModule {}
