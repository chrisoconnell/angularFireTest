import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  moduleId: module.id,
  selector: 'add-hero',
  templateUrl: 'add-hero.component.html',
  styleUrls: ['add-hero.component.css'],
  providers: [HeroService]
})
export class AddHeroComponent implements OnInit {

  constructor(private heroService: HeroService) {}

  ngOnInit() {
  }

  add(id: string, name: string) {
    var hero = {id: parseInt(id), name: name};
    this.heroService.addHero(hero);
  }
}
