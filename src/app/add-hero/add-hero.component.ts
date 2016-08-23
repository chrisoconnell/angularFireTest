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
    if (this.heroService.uid) {
      this.heroService.addHero(hero).then(data => {
        console.log(data);
      });
    } else {
      console.error('you are not logged in');
    }
  }

  addRandom(num: string, batch: string) {
    var count = 1;
    var interval = setInterval(() => {
      this.randomService.getUsers(parseInt(num)).then(data => {
        this.heroService.addRandomUsers(data);
      });
      console.log('send batch ' + count);
      count++;
      if (count > parseInt(batch)) {
        clearInterval(interval);
      }
    }, 2000);
  }
}
