import { MainComponent } from '../main.component';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(main: MainComponent) { }

  ngOnInit() {
  }
  @Input() menuWidth: string;
  @Output() onSetIsMoveBar = new EventEmitter<boolean>();
  bar_mousedown() {
    this.onSetIsMoveBar.emit(true);
  }
}
