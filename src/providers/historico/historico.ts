import { Injectable } from '@angular/core';
import { infoScanner } from '../../models/info.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MapaPage } from '../../pages/mapa/mapa';


@Injectable()
export class HistoricoProvider {

  private historico: infoScanner[] = [];

  constructor( ) {
    console.log('Hello HistoricoProvider Provider');
  }


  public insertarHistorico(texto: string) {

    let obj = new infoScanner(texto);
    this.historico.unshift(obj);

    return obj;


  }


  

  public getHistorial(){
     return this.historico;
  }

}
