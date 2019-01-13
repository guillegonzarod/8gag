import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

// Firebase
import * as firebase from 'firebase';

// Ionic
import { ToastController } from 'ionic-angular';

@Injectable()
export class CargaArchivoProvider {

  imagenes: ArchivoSubir[] = [];

  constructor(
    private toastCtrl: ToastController,
    public afDB: AngularFireDatabase
  ) {
    console.log('Hello CargaArchivoProvider Provider');
  }

  cargar_imagen_firebase(archivo: ArchivoSubir): Promise<any> {
    // Crear una Promesa
    let promesa = new Promise((resolve, reject) => {

      this.mostrar_toast('Cargando...');

      // Crear la referencia a nuestro Almacén (storage) de Firebase
      let storeRef = firebase.storage().ref();

      // Crear un nombre único para el archivo
      let nombreArchivo: string = new Date().valueOf().toString();

      // Crear la referencia del archivo de la imagen en el Almacén
      let referenciaImagen = storeRef.child(`img/${nombreArchivo}`);

      // Crear una tarea de Firebase para subir el archivo y notificar cuando termine
      let uploadTask: firebase.storage.UploadTask =
        referenciaImagen.putString(archivo.img, 'base64', { contentType: 'image/jpeg' });

      // Añadir el método (parecido a un Observable) que controla el proceso de subida de la imagen
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        // Función 'callback' que indica el porcentaje de subida en Mbs
        () => { },
        (error) => {
          console.log("ERROR EN LA CARGA");
          console.log(JSON.stringify(error));
          this.mostrar_toast(JSON.stringify(error));
          // Llamar a la función 'reject()'
          reject();
        },
        () => {
          console.log('Archivo subido');

          this.mostrar_toast('Imagen cargada correctamente');

          // Obtener la URL de Descarga de la imagen
          uploadTask.snapshot.ref.getDownloadURL().then((urlDeDescarga) => {
            archivo.img = urlDeDescarga;

            // Crear el 'Post'
            this.crear_post(archivo.titulo, archivo.img, nombreArchivo);
          });

          // Llamar a la función 'resolve()'
          resolve();
        }
      );
    });

    return promesa;
  }

  private crear_post(titulo: string, url: string, nombreArchivo: string) {
    let post: ArchivoSubir = {
      img: url,
      titulo: titulo,
      key: nombreArchivo
    }

    // this.afDB.list('/post').push(post);

    this.afDB.object(`/post/${nombreArchivo}`).update(post).then(() => {
    }).catch((error) => {
      console.log(error);
    });

    this.imagenes.push(post);
  }

  mostrar_toast(mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();
  }
}

interface ArchivoSubir {
  titulo: string;
  img: string;
  key?: string;
}



