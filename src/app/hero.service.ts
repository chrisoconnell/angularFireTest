import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Hero } from './hero';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare var firebase : any;

@Injectable()
export class HeroService {
  uid: string;
  timestamp: number;

  constructor(private angularFire: AngularFire) {
    this.angularFire.auth.subscribe(auth => {
      if (null !== auth) {
        this.uid = auth.uid;
      }
    });
  }

  getAuth() {
    return this.angularFire.auth;
  }
  
  login() {
    return this.angularFire.auth.login({email: 'cao@mac.com', password: 'ggqnKLfr3$'});
  }

  getHeroes(): FirebaseListObservable<any[]> {
    return this.angularFire.database.list('/hero');
  }

  getUsers(): FirebaseListObservable<User[]> {
    return this.angularFire.database.list('/user');
  }

  getRandomUsers(limit: number, key: string): FirebaseListObservable<any[]> {
    let query: any = {limitToFirst: limit};
    if ("" !== key) {
      query.orderByKey = true;
      query.startAt = key;
    }

    return this.angularFire.database.list('/random-user', {query: query});
  }

  getHero(key: string): FirebaseObjectObservable<any[]> {
    return this.angularFire.database.object('/hero/' + key);
  }

  getHeroesHistory(): FirebaseListObservable<any[]> {
    return this.angularFire.database.list('/hero-history/');
  }

  getHeroHistory(key: string): FirebaseListObservable<any[]> {
    return this.angularFire.database.list('/hero-history/' + key + '/history/');
  }

  getUser(uid) {
    return this.angularFire.database.object('/user/' + uid);
  }

  addHero(hero: Hero) {
    return this.getHeroesHistory().push(this.getHistoryEntry()).then(data => {
      var key = this.getKeyFromData(data);
      this.getHeroHistory(key).push(this.getHeroHistroyEntry(hero)).then(() => {
        return this.getHero(key).set(hero);
      })
    });
  }

  updateHero(hero) {
    this.getHeroHistory(hero.$key).push(this.getHeroHistroyEntry(hero)).then(() => {
      this.getHero(hero.$key).update(this.getHeroEntry(hero));
    });
  }

  deleteHero(hero) {
    var heroHistoryEntry = this.getHeroHistroyEntry(hero);
    heroHistoryEntry.removed = true;
    this.getHeroHistory(hero.$key).push(heroHistoryEntry).then(() => {
      this.getHeroes().remove(hero.$key);
    });
  }

  addRandomUsers(data: any) {
    var users: Array<any> = data.results;
    users.forEach(user => {
      this.angularFire.database.list('/random-user').push(user);
    });
  }
  
  getNextKey(key: string): Observable<any> {
    return this.getRandomUsers(2, key)
      .map(data => {
        return data.pop().$key;
      })
      .catch(error => {
        console.error(error);
        return Observable.throw(error);
      });
  }

  private getKeyFromData(data: any): string {
    return data.path.toString().split("/").pop();
  }

  private getHeroEntry(hero: Hero): Hero {
    return {id: hero.id, name: hero.name};
  }

  private getHistoryEntry() {
    return {
      created: {
        by: this.uid,
        on: this.getTimestamp()
      },
      history: {}
    };
  }

  private getHeroHistroyEntry(hero: Hero): any {
    return {data: this.getHeroEntry(hero), uid: this.uid, timestamp: this.getTimestamp()};
  }

  // Gets timestamp from firebase server. This way clients computer settings won't matter.
  private getTimestamp(): number {
    return firebase.database.ServerValue.TIMESTAMP;
  }
}