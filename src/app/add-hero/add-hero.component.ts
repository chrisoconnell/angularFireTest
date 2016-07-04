import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { RandomService } from '../random.service';

@Component({
  moduleId: module.id,
  selector: 'add-hero',
  templateUrl: 'add-hero.component.html',
  styleUrls: ['add-hero.component.css'],
  providers: [RandomService]
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
    var count = 1;
    var interval = setInterval(() => {
      this.randomService.getUsers(parseInt(num)).then(data => {
        this.heroService.addRandomUsers(data);
      });
      console.log('send batch ' + count);
      count++;
      if (count > 5) {
        clearInterval(interval);
      }
    }, 2000);
  }
}
