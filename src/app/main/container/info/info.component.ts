import { Component, OnInit, Input, EventEmitter, Output, Pipe, PipeTransform, OnChanges } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() item: any;
  @Output() onSetCloseInfo = new EventEmitter();
  dyInfos: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.setDynamicInfo();
  }

  setDynamicInfo() {
    this.dyInfos = [];
    let keys = Object.keys(this.item);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] != '_id' && keys[i] != 'img' && keys[i] != 'title' && keys[i] != 'type' &&
        keys[i] != 'status' && keys[i] != 'date' && keys[i] != 'position') {
        this.dyInfos.push({key: keys[i], value: this.item[keys[i]]});
      }
    }
  }

  closeInfo_click() {
    this.onSetCloseInfo.emit();
  }
}
