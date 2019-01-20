import { CargaArchivoProvider } from './../../providers/carga-archivo/carga-archivo';
import { SocialSharing } from '@ionic-native/social-sharing';
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
    public _cap: CargaArchivoProvider,
    private socialSharing: SocialSharing
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

  compartir(post: any) {
    console.log(`Entra en compartir(): ${post.titulo}`);
    this.socialSharing.shareViaFacebook(post.titulo, post.imagen, post.img)
      .then((datos) => {
        console.log(`Error: ${datos}`);
      }) // Se pudo compartir
      .catch((error) => {
        console.log(`Error: ${error}`);
      }); // Sucedió un error
  }
}
