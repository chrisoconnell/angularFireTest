import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { RandomService } from '../random.service';

@Component({
  moduleId: module.id,
  selector: 'add-hero',
  templateUrl: 'add-hero.component.html',
  styleUrls: ['add-hero.component.css'],
  providers: [HeroService, RandomService]
})
export class AddHeroComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private randomService: RandomService
  ) {}

  ngOnInit() {
  }

  add(id: string, name: string) {
    var hero = {id: parseInt(id), name: name};
    this.heroService.addHero(hero);
  }

  addRandom(num: string) {
    this.randomService.getUsers(parseInt(num)).then(data => {
      this.heroService.addRandomUsers(data);
    })
  }
}
