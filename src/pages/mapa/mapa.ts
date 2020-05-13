import { Component,ViewChild,ElementRef } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

declare var google:any;

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  private localizacion:any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.localizacion = navParams.get("loc");
  }

  ionViewDidLoad() {

    
    let latLng = new google.maps.LatLng(this.localizacion.latitud, this.localizacion.longitud);


    let latitud:number = Number(this.localizacion.latitud);
    let longitud:number = Number(this.localizacion.longitud);


    console.log("Estas son las rutas");
    console.log(latitud);
    console.log(longitud);


    let obj1 = {lat: latitud, lng: longitud}

    let mapOptions = {
      center: obj1,
      zoom: 15,

    }

    

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


    var marker = new google.maps.Marker({position: obj1, map: this.map});
  
  }

}
