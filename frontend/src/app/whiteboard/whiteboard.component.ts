import {Component, Input, OnInit} from '@angular/core';
import * as p5 from 'p5';
import {SocketioService} from '../_services/socketio.service';
import {User} from '../_models/user';
import {Observable} from 'rxjs';
import {WhiteboardService} from '../_services/whiteboard.service';
import {Whiteboard} from '../_models/whiteboard';


@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})

export class WhiteboardComponent implements OnInit {

  public socket;
  sketch: any;
  canvas: any;
  sw = 6;
  c = [];
  strokeColor = 1;

  @Input() user: User;
  boardTitle: string;
  board = [];
  drawnFlag: boolean;

  constructor(private socketService: SocketioService,
              private whiteboardService: WhiteboardService) {}

  ngOnInit(): void {

    if (this.user) {
      this.boardTitle = this.user.username + '\'s board';
      // this.socketService.joinRoom(this.user.username);
    } else {
      this.boardTitle = 'public board';
      // this.socketService.joinRoom('public');
    }

    this.getStrokes(this.user ? this.user.username : 'public');

    this.sketch = s => {
      s.setup = () => {
        this.canvas = s.createCanvas(s.windowWidth * .66, s.windowHeight * .8);

        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed

        this.canvas.parent(this.user ?  this.user.username : 'public');

        // s.background(255);
        s.strokeWeight(this.sw);

        this.c[0] = s.color(255, 255, 255);
        this.c[1] = s.color(0, 0, 0);
        this.c[2] = s.color(0, 0, 255);
        this.c[3] = s.color(0, 255, 0);
        this.c[4] = s.color(255, 0, 0);
        this.c[5] = s.color(191, 0, 255);

        s.stroke(s.color(0, 0, 0));
        s.rect(0, 0, s.width, s.height);
      };

      s.draw = () => {
        if (!this.drawnFlag && this.board) {
          this.board.forEach(m => {
            s.stroke(this.c[m.color]);
            s.line(m.x, m.y, m.px, m.py);
          });
          this.drawnFlag = true;
        }
        console.log(this.board);
        if (s.mouseIsPressed) {
          if (s.mouseButton === s.LEFT) {
            s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
            s.stroke(this.c[this.strokeColor]);
            this.socketService.emitDrawing(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY, this.strokeColor, this.sw,
              this.user ? this.user.username : 'public');
          }
        }

      };

      s.mouseReleased = () => {
        // modulo math forces the color to swap through the array provided
        console.log(`color is now ${this.c[this.strokeColor]}`);
      };

      s.keyPressed = () => {
        if (s.key === 'e') {
          this.strokeColor = 0;
        }
        if (s.key === '1') {
          this.strokeColor = 1;
        }
        if (s.key === '2') {
          this.strokeColor = 2;
        }
        if (s.key === '3') {
          this.strokeColor = 3;
        }
        if (s.key === '4') {
          this.strokeColor = 4;
        }
        if (s.key === '5') {
          this.strokeColor = 5;
        }

        if (s.key === 'c') {
          s.clear();
          s.stroke(s.color(0, 0, 0));
          s.rect(0, 0, s.width, s.height);
          this.whiteboardService.clearBoard(this.user ? this.user.username : 'public').subscribe(
            () => this.board = []);
          // this.getStrokes(this.user ? this.user.username : 'public');
        }
      };

      this.socketService.listen('mouse_input', this.user ? this.user.username : 'public')
        .subscribe((data) => {
          s.stroke(this.c[data.color]);
          s.line(data.x, data.y, data.px, data.py);
        });

    };

    this.canvas = new p5(this.sketch);
    console.log('Whiteboard created');
  }

  private getStrokes(username: string): void {
    console.log(username);
    this.whiteboardService.getBoard(username).subscribe(
      board => { this.board = board;
                 console.log(this.board);
      }
    );
  }
}



