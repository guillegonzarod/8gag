import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

// Rxjs
import 'rxjs/add/operator/map';

// Firebase
import * as firebase from 'firebase';

// Ionic
import { ToastController } from 'ionic-angular';

@Injectable()
export class CargaArchivoProvider {

  imagenes: ArchivoSubir[] = [];
  lastKey: string = null;

  constructor(
    private toastCtrl: ToastController,
    public afDB: AngularFireDatabase
  ) {
    this.cargar_ultimo_key()
    .subscribe(()=>{
      this.cargar_imagenes();
    });
  }

  private cargar_ultimo_key() {
    return this.afDB.list('/post', ref => ref.orderByKey().limitToLast(1))
      .valueChanges()
      .map((post: any) => {
        console.log(`*Post[0]: ${post[0].key}`);
        this.lastKey = post[0].key;
        this.imagenes.push(post[0]);
      });
  }

  cargar_imagenes() {
    return new Promise((resolve, reject) => {
      this.afDB.list('/post',
        ref => ref.limitToLast(3)
          .orderByKey()
          .endAt(this.lastKey)
      ).valueChanges()
        .subscribe((posts: any) => {

          posts.pop();

          if (posts.length == 0) {
            console.log('Ya no hay más registros');
            resolve(false);
            return;
          }

          this.lastKey = posts[0].key;

          for (let i = posts.length - 1; i >= 0; i--) {
            let post = posts[i];
            this.imagenes.push(post);
          }

          resolve(true);
        });
    });
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



