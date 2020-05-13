import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HistoricoProvider } from '../../providers/historico/historico';
import { infoScanner } from '../../models/info.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MapaPage } from '../mapa/mapa';


/**
 * Generated class for the GuardadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {
  private arreglo:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private historial:HistoricoProvider,
    private inappBrowse:InAppBrowser) {

    this.arreglo = this.historial.getHistorial();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardadosPage');
  }


  public ejecutar(item:infoScanner,index){
    let obj = this.arreglo[index];

    switch (obj.tipo) {
      case "http":
        this.inappBrowse.create(obj.texto,"_system");
        break;
      case "mapa":
         
      let cadena = obj.texto.substring(obj.texto.indexOf(":")+1);
      let split = cadena.split(',');

          let localizacion = {
            latitud:split[0],
            longitud:split[1]
          }

          


        this.navCtrl.push(MapaPage,{loc:localizacion});

        break;
      default:
        break;
    }
  }

}
