import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string;

  imagenPreview: string;

  constructor(private viewCtrl: ViewController, private camera: Camera) { }

  cerrar_modal() {
    this.viewCtrl.dismiss();
  }

  mostrar_camara() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imagenPreview = 'data:image/jpg;base64,' + imageData;
    }, (err) => {
      console.log(`ERROR EN LA CÁMARA: ${JSON.stringify(err)}`);
    });
  }
}
