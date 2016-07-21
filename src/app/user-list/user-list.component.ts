import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  moduleId: module.id,
  selector: 'user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
  users;
  nextUserKey: string;
  loggedIn: boolean = false;
  
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getUsers("");
  }

  getUsers(startKey: string) {
    this.nextUserKey = "";
    this.heroService.getAuth().subscribe(auth => {
      if (null !== auth) {
        this.users = this.heroService.getUsers(5, startKey);
        this.users.subscribe(data => {
          let lastKey = data.pop().$key;
          this.heroService.getNextKey(lastKey).subscribe(data => {
            this.nextUserKey = data;
          });
        }, error => console.log(error));
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }
}
