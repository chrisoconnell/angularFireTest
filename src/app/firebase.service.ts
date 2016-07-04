import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Hero } from './hero';

@Injectable()
export class FirebaseService {
  constructor (private angularFire: AngularFire) {}

  getHeroes(): FirebaseListObservable<any[]> {
    return this.angularFire.database.list('/hero');
  }
}