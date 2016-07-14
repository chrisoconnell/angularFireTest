import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Hero } from './hero';

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

  getHero(key: string): FirebaseObjectObservable<any[]> {
    return this.angularFire.database.object('/hero/' + key);
  }

  getHeroesHistory(): FirebaseListObservable<any[]> {
    return this.angularFire.database.list('/hero-history/');
  }

  getHeroHistory(key: string): FirebaseListObservable<any[]> {
    return this.angularFire.database.list('/hero-history/' + key + '/history/');
  }

  addHero(hero: Hero) {
    this.resetTimestamp();

    this.getHeroesHistory().push(this.getHistoryEntry()).then(data => {
      var key = this.getKeyFromData(data);
      this.getHeroHistory(key).push(this.getHeroHistroyEntry(hero)).then(() => {
        hero['history-key'] = key;
        this.getHeroes().push(hero);
      })
    });
  }

  updateHero(hero) {
    this.resetTimestamp();

    this.getHeroHistory(hero['history-key']).push(this.getHeroHistroyEntry(hero)).then(() => {
      this.getHero(hero.$key).update(this.getHeroEntry(hero));
    });
  }

  deleteHero(hero) {
    this.resetTimestamp();

    var heroHistoryEntry = this.getHeroHistroyEntry(hero);
    heroHistoryEntry.removed = true;
    this.getHeroHistory(hero['history-key']).push(heroHistoryEntry).then(() => {
      this.getHeroes().remove(hero.$key);
    });
  }

  addRandomUsers(data: any) {
    var users = data.results;
    users.forEach(user => {
      this.angularFire.database.list('/user').push(user);
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
      "created-by": this.uid,
      "created-on": this.getTimestamp(),
      history: {}
    };
  }

  private getHeroHistroyEntry(hero: Hero): any {
    return {data: this.getHeroEntry(hero), uid: this.uid, timestamp: this.getTimestamp()};
  }

  private getTimestamp(): number {
    if (null === this.timestamp) {
      this.resetTimestamp();
    }

    return this.timestamp;
  }

  private resetTimestamp() {
    this.timestamp = Date.now();
  }
}