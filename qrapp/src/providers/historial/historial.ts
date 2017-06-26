import { Injectable } from '@angular/core';
import {ScanData} from "../../models/scan-data.models";

@Injectable()
export class HistorialProvider {
  private _historial:ScanData[] = [];

  constructor() {}

  agregar_historial( texto:string){
    let data = new ScanData(texto);
    this._historial.unshift(data);
    console.log(this._historial);
  }

  cargar_historial(){
    return this._historial;
  }

}
