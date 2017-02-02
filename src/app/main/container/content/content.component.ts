import { ChatService } from '../../../service/chat.service';
import { WebsocketService } from '../../../service/websocket.service';
import { InfoComponent } from '../info/info.component';
import { TypeScriptEmitter } from '@angular/compiler';
import { AngularCompilerOptions } from '@angular/compiler-cli';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ChatService, WebsocketService]
})
export class ContentComponent implements OnInit {
  @ViewChild(InfoComponent) infoComponent: InfoComponent;
  items: any[] = [];
  item: any = null;
  isInfo: boolean = false;
  isPopReg: boolean = false;
  popRegTitle: string;
  isButtonType: boolean = true;
  popModItem: any = {};

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    this.callGetItmes();
  }

  /*---------- Custom Event ----------*/
  onSetCloseInfo() {
    this.isInfo = false;
  }

  onCloseRegisterPopup() {
    this.isPopReg = false;
  }

  onInsertItem(event) {
    this.items = [event].concat(this.items);
  }

  onUpdateItem(event) {
    let index = this.items.indexOf(event[0]);
    this.items[index] = event[1];
    this.item = event[1];
    this.infoComponent.ngOnChanges();
  }

  /*---------- Event ----------*/
  item_click(event, item: any) {
    [].forEach.call(document.getElementsByClassName('select'), function(el){
      el.style.display = 'none';
    });
    event.currentTarget.children[3].style.display = 'block';
    this.item = item;
    this.isInfo = true;
  }

  content_click(event) {
    this.isPopReg = false;
    if (event.currentTarget === event.target) {
      [].forEach.call(document.getElementsByClassName('select'), function(el){
        el.style.display = 'none';
      });
      this.item = null;
      this.isInfo = false;
    }
  }

  register_click() {
    this.popModItem = {};
    this.popRegTitle = 'Register';
    this.isButtonType = true;
    this.isPopReg = true;
  }

  modify_click() {
    if (this.item == null) {
      return;
    }
    this.popModItem = this.item;
    this.popRegTitle = 'Modify';
    this.isButtonType = false;
    this.isPopReg = true;
  }

  delete_click() {
    this.callDeleteItme();
  }



  /*---------- Method ----------*/
  callGetItmes() {
    this.http.get('http://192.168.10.96:8089/datascrip/mongo/getMongoList')
      .subscribe(
        data => {
          this.items = data.json().rows;
        },
        err => {
          console.log(err);
        },
        () => {}
      );
  }

  callDeleteItme() {
    let headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    this.http.post('http://192.168.10.96:8089/datascrip/mongo/deleteMongo',
        '_id=' + encodeURIComponent(this.item._id),
        {headers}
      )
      .subscribe(
        data => {
          let index = this.items.indexOf(this.item);
          this.items.splice(index, 1);
          console.log(data.json());
        },
        err => {
          console.log(err);
        },
        () => {}
      );
  }

}
