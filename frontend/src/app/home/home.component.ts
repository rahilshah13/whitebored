import {Component, OnInit, Renderer2, RendererFactory2} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  boardName = 'public';
  constructor() {}

  ngOnInit(): void {

  }

}
