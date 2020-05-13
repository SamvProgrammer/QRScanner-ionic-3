import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HistoricoProvider } from '../../providers/historico/historico';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { MapaPage } from '../mapa/mapa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private barcode: BarcodeScanner, private toastCtrl: ToastController,
    private platform: Platform, private historico: HistoricoProvider, private inappbrowse: InAppBrowser, private contactCtrl: Contacts) {

  }


  public scaner() {
    if (this.platform.is("cordova")) {
      this.barcode.scan().then(barcodeData => {
        let json = JSON.stringify(barcodeData);
        console.log('Barcode data\n', json);

        let obj = this.historico.insertarHistorico(barcodeData.text);
        switch (obj.tipo) {
          case "http":
            this.inappbrowse.create(obj.texto, "_system");
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
          case "contacto":

          //Se obtiene de la vcard los datos y se parsea a json

            let textoParsear = obj.texto.replace("BEGIN:VCARD\n", "{");
            textoParsear = textoParsear.replace("\nEND:VCARD", "'}");
            textoParsear = textoParsear.replace(/\n/g, "',");
            textoParsear = textoParsear.replace(/:/g,":'");
            console.log("Texto parseado " + textoParsear);
            let json:any = JSON.stringify(textoParsear);
            json = JSON.parse(json);


            let contacto = {
              nombre: json.N,
              titulo: json.title,
              direccion: json.ADDR,
              telefono: json.tel,
              correo: json.email
            };

          
            //Aqui se forma ya el contacto

            let contact: Contact = this.contactCtrl.create();

            contact.name = new ContactName(null,contacto.nombre);
            contact.phoneNumbers = [new ContactField('mobile', contacto.telefono)];
            contact.save().then(
              () => {
                let toast = this.toastCtrl.create({message:"Contacto creado.",duration:1500});
                toast.present();
              },
              (error: any) => {
                let toast = this.toastCtrl.create({message:"Error al crear el contacto",duration:1500});
                toast.present();
              }
            );
            break;
            case "correo":

               let texto = obj.texto.replace("MATMSG:","");
               let split1 = texto.split(';');
               let correo = split1[0].substring(split1[0].indexOf(':')+1);
               let asunto = split1[1].substring(split1[1].indexOf(':')+1);
               let cuerpo = split1[2].substring(split1[2].indexOf(':')+1);

               this.inappbrowse.create(`mailto:${correo}?subject=${asunto}&body=${cuerpo}`, "_system");

               break;
        }

      }).catch(err => {
        console.error('Error', err);
        this.mostrarMensaje("Error " + err);
      });
    } else {
      console.log("Se ejecuta la parte del else");
      let obj = this.historico.insertarHistorico("https://ionicframework.com/docs/v3/native/in-app-browser/");
      this.inappbrowse.create(obj.texto, "_system");
    }
  }


  private mostrarMensaje(mensaje: string) {

    let toast = this.toastCtrl.create({ message: mensaje, duration: 1500 });
    toast.present();
  }

}
