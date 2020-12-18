
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { Whiteboard } from '../_models/whiteboard';
import {Observable} from 'rxjs';




@Injectable({ providedIn: 'root' })
export class WhiteboardService {
  constructor(private http: HttpClient) { }


  getBoard(username: string): any{
    console.log('getBoard()');
    return this.http.get<any>(`http://localhost:4000/whiteboard/getboard`, {params: new HttpParams().set('username', username)});
  }

  clearBoard(username: string): any{
    console.log('clearBoard()');
    return this.http.get<any>(`http://localhost:4000/whiteboard/clearboard`, {params: new HttpParams().set('username', username)});
  }

}
