import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
// Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

// Services
import { CargaArchivoProvider } from './../../providers/carga-archivo/carga-archivo';

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string = "";

  imagenPreview: string = "";
  imagen64: string;

  constructor(private viewCtrl: ViewController, private camera: Camera, private imagePicker: ImagePicker,
    public _cap: CargaArchivoProvider) { }

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
      this.imagen64 = imageData;
    }, (err) => {
      console.log(`ERROR EN LA CÁMARA: ${JSON.stringify(err)}`);
    });
  }

  subir_foto() {

    console.log(`Botón 'Seleccionar' pulsado!!!`);
    let opciones: ImagePickerOptions = {
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    };

    this.imagePicker.getPictures(opciones).then((results) => {
      for (var i = 0; i < results.length; i++) {
        // console.log('Image URI: ' + results[i]);
        this.imagenPreview = 'data:image/jpg;base64,' + results[i];
        this.imagen64 = results[i];
      }
    }, (err) => {
      console.log(`ERROR EN LA GALERÍA: ${JSON.stringify(err)}`);
    });
  }

  crear_post() {

    let archivo = {
      img: this.imagen64,
      titulo: this.titulo
    }

    this._cap.cargar_imagen_firebase(archivo).then(() => {
      this.cerrar_modal();
    });

  }
}
