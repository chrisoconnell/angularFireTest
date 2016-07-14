import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  auth;
  isLoggedIn: boolean;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.setLoggedIn();
  }

  login() {
    this.heroService.login();
  }

  logout() {
    this.heroService.getAuth().logout();
  }

  setLoggedIn() {
    this.heroService.getAuth().subscribe(() => this.auth = this.heroService.getAuth());
  }
}
