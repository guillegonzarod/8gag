import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  constructor(private viewCtrl: ViewController) {
  }

  cerrar_modal() {
    this.viewCtrl.dismiss();
  }

}
