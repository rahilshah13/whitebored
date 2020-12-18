import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {NotificationService} from '../_services/notification.service';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-my-board',
  templateUrl: './myboard.component.html',
  styleUrls: ['./myboard.component.css']
})
export class MyBoardComponent implements OnInit {

  user: User;

  // friends: User[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notifService: NotificationService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(x => this.user = x);
    // Observing currentUser. We will need it to get user's id.
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.user = x);
  }

}
