import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubirPage } from "../subir/subir";
import { CargarArchivosProvider } from "../../providers/cargar-archivos/cargar-archivos";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMas:boolean = true;

  constructor(public navCtrl: NavController,
              private _cap: CargarArchivosProvider,
              private modalCtrl:ModalController) {
    this._cap.cargar_imagenes();
  }

  mostrar_modal(){
    let modal = this.modalCtrl.create(SubirPage);
    modal.present();
  }

  cargar_siguientes(infiniteScroll:any) {
    console.log('Siguientes...');

    this._cap.cargar_imagenes()
      .then(
        (existenMas:boolean)=>{
          infiniteScroll.complete();
          this.hayMas = existenMas;
        }
      )

    /*setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);*/
  }
}
