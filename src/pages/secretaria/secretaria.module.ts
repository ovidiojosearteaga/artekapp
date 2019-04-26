import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecretariaPage } from './secretaria';

@NgModule({
  declarations: [
    SecretariaPage,
  ],
  imports: [
    IonicPageModule.forChild(SecretariaPage),
  ],
})
export class SecretariaPageModule {}
