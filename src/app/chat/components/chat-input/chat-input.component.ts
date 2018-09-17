import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  template: `
      <input class="message form-control input-lg bg-light text-white border-secondary" type="text" placeholder="Your Message"
             #message (keyup.enter)="sendMessage();"/>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
      .message {
        width: 100%!important;
      }
    `
  ]
})
export class ChatInputComponent implements OnInit {
  @ViewChild('message') message: ElementRef<HTMLInputElement>;
  @Output() action = new EventEmitter();

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.focus(), 300);
  }

  sendMessage() {
    const message = this.message.nativeElement.value;
    this.message.nativeElement.value = '';

    if (message.trim() !== '') {
      this.action.emit({ type: 'SEND_MESSAGE', payload: { message } });
    }
  }

  focus() {
    this.message.nativeElement.focus();
  }
}
