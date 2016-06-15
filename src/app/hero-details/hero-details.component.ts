import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  moduleId: module.id,
  selector: 'hero-details',
  templateUrl: 'hero-details.component.html',
  styleUrls: ['hero-details.component.css'],
  providers: [HeroService]
})
export class HeroDetailsComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heroService: HeroService) {}
  
  ngOnInit() {}

  updateHero() {
    this.heroService.updateHero(this.hero);

  }

  deleteHero() {
    this.heroService.deleteHero(this.hero);
    this.hero = null;
  }
}
