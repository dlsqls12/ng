import { TypeScriptEmitter } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public isMoveBar: boolean = false;
  public menuWidth: string = '200px';
  constructor() { }

  ngOnInit() {
  }
  onSetIsMoveBar(isSlide: boolean) {
    this.isMoveBar = isSlide;
  }
  body_mousemove(event) {
    if (this.isMoveBar) {
      this.menuWidth = event.pageX + 'px';
    }
  }
  body_mouseup(event) {
    if (this.isMoveBar) {
      this.menuWidth = event.pageX + 'px';
      this.isMoveBar = false;
    }
  }
}
