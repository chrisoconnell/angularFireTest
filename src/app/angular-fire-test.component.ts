import { Component } from '@angular/core';
import { HeroListComponent } from './hero-list';
import { HeroDetailsComponent } from './hero-details';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'angular-fire-test-app',
  templateUrl: 'angular-fire-test.component.html',
  styleUrls: ['angular-fire-test.component.css'],
  directives: [HeroListComponent, HeroDetailsComponent],
  providers: [HeroService]
})
export class AngularFireTestAppComponent {
  title = 'Tour of Heroes';
  selectedHero: Hero;

  constructor(private heroService: HeroService) {}

  setSelectedHero(event) {
    this.selectedHero = event;
  }

  add(id: string, name: string) {
    var hero = {id: parseInt(id), name: name};
    this.heroService.addHero(hero);
  }
}
