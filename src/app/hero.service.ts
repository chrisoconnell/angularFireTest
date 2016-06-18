import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Hero } from './hero';

@Injectable()
export class HeroService {
  constructor(private angularFire: AngularFire) {}

  getAuth() {
    return this.angularFire.auth;
  }
  
  login() {
    return this.angularFire.auth.login({email: 'chris@chrisoconnell.info', password: 'ggqnKLfr3$'});
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
    this.getHeroesHistory().push({history: {}}).then(data => {
      var key = this.getKeyFromData(data);
      this.getHeroHistory(key).push(this.getHeroHistroyEntry(hero)).then(() => {
        hero['history-key'] = key;
        this.getHeroes().push(hero);
      })
    });
  }

  updateHero(hero) {
    this.getHeroHistory(hero['history-key']).push(this.getHeroHistroyEntry(hero)).then(() => {
      this.getHero(hero.$key).update(this.getHeroEntry(hero));
    });
  }

  deleteHero(hero) {
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
    return data.path.u.pop();
  }

  private getHeroEntry(hero: Hero): Hero {
    return {id: hero.id, name: hero.name};
  }

  private getHeroHistroyEntry(hero: Hero): any {
    return {data: this.getHeroEntry(hero), uid: 5, timestamp: Date.now()};
  }
}