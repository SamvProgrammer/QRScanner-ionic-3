import { ToastController, NavController } from "ionic-angular";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MapaPage } from '../app/direcciones.pages';

export class infoScanner {
    public texto: string;
    public tipo: string;


    public constructor(texto:string){
        if(texto.toLocaleLowerCase().startsWith("http")){
            this.tipo = "http";
            
        }else if(texto.toLocaleLowerCase().startsWith("geo")){
           this.tipo = "mapa";
        }
        else if(texto.toLocaleLowerCase().startsWith("begin:vcard")){
            this.tipo = "contacto";
        }else if(texto.toLocaleLowerCase().startsWith("matmsg")){
            this.tipo = "correo";
        }



        this.texto = texto;
    }

}


  
