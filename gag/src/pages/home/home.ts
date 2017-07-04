import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubirPage } from "../subir/subir";
import { CargarArchivosProvider } from "../../providers/cargar-archivos/cargar-archivos";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,
              private _cap: CargarArchivosProvider,
              private modalCtrl:ModalController) {
    this._cap.cargar_imagenes();
  }

  mostrar_modal(){
    let modal = this.modalCtrl.create(SubirPage);
    modal.present();
  }
}
