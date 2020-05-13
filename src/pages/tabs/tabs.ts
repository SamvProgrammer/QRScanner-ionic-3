import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HomePage,GuardadosPage  } from '../../app/direcciones.pages';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
 tab1:any =HomePage ;
 tab2:any =GuardadosPage ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
