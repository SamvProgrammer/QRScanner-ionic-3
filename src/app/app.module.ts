import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Contacts } from '@ionic-native/contacts';

import { MyApp } from './app.component';
import { GuardadosPage,HomePage,MapaPage,TabsPage } from './direcciones.pages';

//import { AgmCoreModule } from '@agm/core';


//pluging native cordova

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';


//providers
import { HistoricoProvider } from '../providers/historico/historico';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GuardadosPage,
    MapaPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GuardadosPage,
    MapaPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    HistoricoProvider,
    InAppBrowser,
    Contacts
  ]
})
export class AppModule {}
