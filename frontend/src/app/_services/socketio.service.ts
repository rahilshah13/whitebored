import {Injectable} from '@angular/core';
import { io } from 'socket.io-client';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SocketioService {

  public socket;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT,  {transports: ['websocket', 'polling']});
  }


  emitDrawing(mouseX, mouseY, pmouseX, pmouseY, sc, sw, un): void {
    const data = {
      x: mouseX,
      y: mouseY,
      px: pmouseX,
      py: pmouseY,
      color: sc,
      strokeWidth: sw,
      username: un
    };
    this.socket.compress(true).emit('mouse_output', data);
  }

  listen(eventName: string, username: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        if (username === data.username) {
          subscriber.next(data);
        }
      });
    });
  }

}
