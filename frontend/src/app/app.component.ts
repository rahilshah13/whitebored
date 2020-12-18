import {Component, OnInit} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from './_services/notification.service';
import {User} from './_models/user';
import {Role} from './_models/role';
import {SocketioService} from './_services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'whitebored.io';
  currentUser: User;


  constructor(  private router: Router,
                private authService: AuthService,
                private notifService: NotificationService,
                private socketService: SocketioService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  // get isProf() {
  //   return this.currentUser && this.currentUser.role === Role.professor;
  // }

  get isUser(): User {
    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }



}
