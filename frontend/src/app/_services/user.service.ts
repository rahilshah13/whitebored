
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import {Observable} from 'rxjs';




@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }


  getAll(): Observable<User[]> {
    console.log('getAll()');
    return this.http.get<User[]>(`http://localhost:4000/user/allusers`);
  }


  register(user: User): Observable<any> {
    return this.http.post(`http://localhost:4000/user/register`, user);
  }


  // registerCourse(id: string) {
  //   console.log(id);
  //   return this.http.post(`http://localhost:4000/user/registercourse`, {courseid: id});
  // }


}
