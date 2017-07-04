import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { ToastController } from "ionic-angular";
import * as firebase from "firebase";

@Injectable()
export class CargarArchivosProvider {

  private CARPETA_IMAGENES:string = "img";
  private POSTS:string = "posts";

  imagenes:any[] = [];
  lastKey:string = undefined;

  constructor( public af:AngularFireDatabase,
               private toastCtrl:ToastController) {}

  cargar_imagenes(){
    return new Promise((resolve, reject)=>{
      this.af.list("/posts",{
        query:{
          limitToLast: 4,
          orderByKey: true,
          endAt: this.lastKey
        }
      }).subscribe(posts => {
        /*if(this.lastKey){
          posts.pop();
        }*/
        if(posts.length == 0){
          console.log("Ya no existe registros");
          this.mostrar_toast("Ya no existe registros");
          resolve(false);
          return;
        }
        this.lastKey = posts[0].$key;
        for(let i = posts.length;i>=0;i--){
          let post = posts[i];
          this.imagenes.push(post);
        }
        resolve(true);
      });
    });
 }

  cargar_imagenes_firebase( archivo:archivoSubir ){
    let promesa = new Promise((resolve, reject)=>{
      this.mostrar_toast("Inicio de carga");
      let storageRef = firebase.storage().ref();
      let nombreArchivo = new Date().valueOf();
      let uploadTask:firebase.storage.UploadTask =
        storageRef.child(`${this.CARPETA_IMAGENES}/${nombreArchivo}`)
        .putString(archivo.img,'base64', {contentType:'image/jpeg'});
      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot)=>{//avance archivo

        },
        (error)=>{//manejo errores
          console.log("Error al subir", JSON.stringify(error));
          this.mostrar_toast("Error al cargar: " + JSON.stringify(error));
          reject(error);
        },
        ()=>{//fin proceso
          let url = uploadTask.snapshot.downloadURL;
          this.mostrar_toast("Imagen cargada exitosamente!!");
          this.create_post(archivo.titulo, url);
          resolve();
        }
      )
    });
    return promesa;
  }

  private create_post(titulo:string, url:string){
    let post:archivoSubir = {
      img: url,
      titulo: titulo
    };
    let $key = this.af.list(`/${this.POSTS}`).push( post ).key;
    post.$key = $key;
    this.imagenes.push(post);
  }

  private mostrar_toast(texto:string){
    this.toastCtrl.create({
      message: texto,
      duration: 2500
    }).present();
  }

}

interface archivoSubir{
  $key?:string;
  img:string;
  titulo:string;
}
