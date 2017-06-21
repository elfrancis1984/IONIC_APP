import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalPage } from '../index.paginas';

@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  ActivarPrincipal(){
      this.navCtrl.parent.select(1);
  }

  mostrar_modal(){
    let modal = this.modalCtrl.create(ModalPage, {nombre:"Francisco",edad:33});
    modal.present();
    modal.onDidDismiss(parametros=>{
      parametros?console.log("Data del modal:", parametros):console.log("Se cerro sin parámetros");
    })
  }

}
