import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyBscuTntPAwKo3yG47pM5IHv0Yd2GxPDMM",
    authDomain: "angular2fire.firebaseapp.com",
    databaseURL: "https://angular2fire.firebaseio.com",
    storageBucket: "angular2fire.appspot.com",
  })
]);
