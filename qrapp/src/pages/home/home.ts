import { Component } from '@angular/core';

//Pliugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//Componentes
import { ToastController, Platform } from 'ionic-angular';

//Servicios
import {HistorialProvider} from "../../providers/historial/historial";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private platform: Platform,
              private historialProvider: HistorialProvider) {}

  scan(){
    console.log("Realizando scan");

    if(!this.platform.is('cordova')){
      this.historialProvider.agregar_historial("http://www.google.com");
      return;
    }
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     console.log("Result: " + barcodeData.text );
     console.log("Format: " + barcodeData.format );
     console.log("Cancelled: " + barcodeData.cancelled );

     if(!barcodeData.cancelled && barcodeData.text != null){
       this.historialProvider.agregar_historial(barcodeData.text);
     }

    }, (err) => {
        // An error occurred
        console.error("Error: ", err);
        this.mostrarError("Error: " + err);
    });
  }

  mostrarError( mensaje:string ){
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });
    toast.present();
  }

}
