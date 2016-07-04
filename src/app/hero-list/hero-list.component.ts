import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeroService } from '../hero.service';
import { FirebaseListObservable } from 'angularfire2';
import { Hero } from '../hero';

@Component({
  moduleId: module.id,
  selector: 'hero-list',
  templateUrl: 'hero-list.component.html',
  styleUrls: ['hero-list.component.css'],
  providers: [HeroService]
})
export class HeroListComponent implements OnInit {
  heroes: FirebaseListObservable<any[]>;
  auth;
  @Output() selectedHero = new EventEmitter<any>();

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }
  
  getHeroes() {
    this.heroes = this.heroService.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero.emit(hero);
  }
}
