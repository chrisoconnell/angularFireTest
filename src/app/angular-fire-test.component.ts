import { Component } from '@angular/core';
import { HeroListComponent } from './hero-list';
import { HeroDetailsComponent } from './hero-details';
import { AddHeroComponent } from './add-hero';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'angular-fire-test.component.html',
  styleUrls: ['angular-fire-test.component.css'],
  directives: [HeroListComponent, HeroDetailsComponent, AddHeroComponent]
})
export class AngularFireTestAppComponent {
  title = 'Tour of Heroes';
  selectedHero: Hero;
  
  setSelectedHero(event) {
    this.selectedHero = event;
  }
}
