import { CargaArchivoProvider } from './../../providers/carga-archivo/carga-archivo';

import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from '../index.pages';

// Firebase
// import { AngularFireDatabase } from '@angular/fire/database';

// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // posts: Observable<any[]>;
  hayMas: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    public _cap: CargaArchivoProvider
  ) {
    // this.posts = afDB.list('post').valueChanges();
  }

  mostrar_modal() {
    let modal = this.modalCtrl.create(SubirPage);
    modal.present();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    
    this._cap.cargar_imagenes().then((hayMas: boolean) => {
      this.hayMas = hayMas;
      infiniteScroll.complete();
    });
  }
}
