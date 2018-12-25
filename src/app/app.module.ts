import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage, SubirPage } from '../pages/index.pages';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Pipes
import { PipesModule } from './../pipes/pipes.module';

export const firebaseConfig = {
  apiKey: "AIzaSyByzgqM2D_kWnIcgneaW2wJTQdfqqX2B6M",
  authDomain: "gag-e01c5.firebaseapp.com",
  databaseURL: "https://gag-e01c5.firebaseio.com",
  projectId: "gag-e01c5",
  storageBucket: "gag-e01c5.appspot.com",
  messagingSenderId: "142772827209"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
