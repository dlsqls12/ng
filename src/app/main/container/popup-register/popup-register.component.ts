import { ChatService, Message } from '../../../service/chat.service';
import { Component, OnInit, EventEmitter, Output, Input, trigger, state, style, transition, group, animate } from '@angular/core';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-popup-register',
  templateUrl: './popup-register.component.html',
  styleUrls: ['./popup-register.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({width: 200, transform: 'translateX(100px)', opacity: 0}),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 400
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 400
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ],
  providers: [ChatService]
})
export class PopupRegisterComponent implements OnInit {
  @Output() onCloseRegisterPopup = new EventEmitter();
  @Output() onInsertItem = new EventEmitter<any>();
  @Output() onUpdateItem = new EventEmitter<any[]>();
  @Input() title: string;
  @Input() isButtonType: boolean;
  @Input() item: any = {};
  dyProps: any[] = [];
  originItem: any = {};

  constructor(
    private http: Http,
    private chatService: ChatService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.originItem = Object.assign(this.originItem, this.item);
    if (this.item.img != null && this.item.img !== '') {
      document.getElementById('pop_register').querySelector('img').src = this.item.img;
    }
    let keys = Object.keys(this.item);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== '_id' && keys[i] !== 'img' && keys[i] !== 'title' && keys[i] !== 'type' &&
        keys[i] !== 'status' && keys[i] !== 'date' && keys[i] !== 'position') {
        this.dyProps.push({key: keys[i], value: this.item[keys[i]]});
      }
    }
  }

  /*-------- Event --------*/
  addColumn_click() {
    this.dyProps.push({});
  }

  deleteDy_click(index: number, key) {
    delete this.item[key];
    this.dyProps.splice(index, 1);
  }

  close_click() {
    this.onCloseRegisterPopup.emit();
  }

  register_click() {
//    let messages: Message[] = new Array();
//    this.chatService.messages.subscribe(msg => {
//      messages.push(msg);
//      console.log(messages);
//    });
    this.item.img = document.getElementById('pop_register').querySelector('img').src;
    this.dyProps.forEach(dy => {
      this.item[dy.key] = dy.value;
    });
    this.callInsertItem();
  }

  modify_click() {
    this.item.img = document.getElementById('pop_register').querySelector('img').src;
    this.dyProps.forEach(dy => {
      this.item[dy.key] = dy.value;
    });
    this.callUpdateItem();
  }

  file_change(event) {
    let img = document.getElementById('pop_register').querySelector('img');
    let file = event.target.files[0];
    if (file == null) {
      img.src = '';
      return;
    }
    let fr: FileReader = new FileReader();
    fr.onloadend = function(e) {
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
    console.log(this.item);
  }



  /*---------- Method ----------*/
  callInsertItem() {
    let data = '';
    let keys = Object.keys(this.item);
    let headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded; charset=UTF-8');

    for (let i = 0; i < keys.length; i++) {
      if (this.item[keys[i]] != null && this.item[keys[i]] !== '') {
        data += keys[i] + '=' + encodeURIComponent(this.item[keys[i]]) + '&';
      }
    }

    this.http.post('http://192.168.10.96:8089/datascrip/mongo/insertMongo',
        data,
        {headers}
      )
      .subscribe(
        res => {
          this.item._id = res.json()._id;
          this.onInsertItem.emit(this.item);
          this.onCloseRegisterPopup.emit();
        },
        err => {
          console.log(err);
        },
        () => {}
      );
  }

  callUpdateItem() {
    let data = '';
    let keys = Object.keys(this.item);
    let headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded; charset=UTF-8');

    for (let i = 0; i < keys.length; i++) {
      if (this.item[keys[i]] != null && this.item[keys[i]] !== '') {
        data += keys[i] + '=' + encodeURIComponent(this.item[keys[i]]) + '&';
      }
    }

    this.http.post('http://192.168.10.96:8089/datascrip/mongo/updateMongo',
        data,
        {headers}
      )
      .subscribe(
        res => {
          this.onUpdateItem.emit([this.originItem, this.item]);
          this.onCloseRegisterPopup.emit();
        },
        err => {
          console.log(err);
        },
        () => {}
      );
  }

}

