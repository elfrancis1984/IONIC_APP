import { Component } from '@angular/core';
import { ViewController, ToastController, Platform } from "ionic-angular";

//Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo:string = "";
  imgPreview:string = null;

  constructor(private viewCtrl:ViewController,
              private toastCtrl:ToastController,
              private platform:Platform,
              private camera: Camera) {}

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  mostrar_camara(){
    if(!this.platform.is("cordova")){
        this.mostra_toast("Error: No estamos en un celular");
        return;
    }

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
    this.imgPreview = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     this.mostra_toast("Error: " + err);
     console.error("Error en la camara ", err);
   });
  }

  private mostra_toast(texto:string){
    this.toastCtrl.create({
      message: texto,
      duration: 2500
    }).present();
  }

}
