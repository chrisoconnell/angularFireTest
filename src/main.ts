import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AngularFireTestAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AngularFireTestAppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://angular2fire.firebaseio.com')
]);

