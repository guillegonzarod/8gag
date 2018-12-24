
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubirPage } from '../index.pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {

  }

  mostrar_modal() {
    let modal = this.modalCtrl.create(SubirPage);
    modal.present();
  }

}
