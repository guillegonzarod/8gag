import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubirPage } from './subir';


@NgModule({
  declarations: [
    SubirPage,
  ],
  imports: [
    IonicPageModule.forChild(SubirPage),
    PipesModule
  ],
})
export class SubirPageModule {}
