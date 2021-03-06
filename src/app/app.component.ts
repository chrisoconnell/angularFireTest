import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroListComponent } from './hero-list/hero-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { HeroService } from './hero.service';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { LoginComponent } from './login/login.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [HeroListComponent, UserListComponent, AddHeroComponent, HeroDetailsComponent, LoginComponent],
  providers: [HeroService]
})
export class AppComponent implements OnInit{
  title = 'Tour of Heroes';
  selectedHero: Hero;

  constructor() {
  }

  ngOnInit() {
  }

  setSelectedHero(event) {
    this.selectedHero = event;
  }
}