import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { Pagina2Page } from '../index.paginas';

/**
 * Generated class for the PrincipalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  pagina2:any = Pagina2Page;

  constructor(public navCtrl: NavController, private menuCtrl:MenuController) {
  }

  navegar_pagina(){
    this.navCtrl.push( Pagina2Page );
  }

  mostrarMenu(){
    this.menuCtrl.toggle();
  }

}
