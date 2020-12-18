import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';
import {AuthGuard} from './_guards/auth.guard';
import {FeedComponent} from './feed/feed.component';
import {MyBoardComponent} from './myboard/myboard.component';



const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
  { path: 'myboard', component: MyBoardComponent, canActivate: [AuthGuard]},

  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   canActivate: [AuthGuard],
  //   // The prof route also sets the roles data property to [Role.professor] so only admin users can access it.
  //   data: { roles: [Role.professor] }
  // },

  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
