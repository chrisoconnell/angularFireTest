import { Component } from '@angular/core';
import { HeroListComponent } from './hero-list';
import { HeroDetailsComponent } from './hero-details';
import { AddHeroComponent } from './add-hero';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [HeroListComponent, HeroDetailsComponent, AddHeroComponent]
})
export class AngularFireTestAppComponent {
  title = 'Tour of Heroes';
  selectedHero: Hero;
  
  setSelectedHero(event) {
    this.selectedHero = event;
  }
}
