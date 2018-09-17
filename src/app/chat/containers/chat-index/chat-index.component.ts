import { Component, OnInit } from '@angular/core';
import { MessagePayload, PublishGQL, SubscribeGQL } from '../../../generated/graphql';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-index',
  template: `
    <app-chat-messages [messages]="messages"></app-chat-messages>
    <nav class="navbar fixed-bottom navbar-expand navbar-light bg-light">
      <app-chat-input (action)="handleAction($event)"></app-chat-input>
    </nav>
  `,
  styles: []
})
export class ChatIndexComponent implements OnInit {
  public messages: MessagePayload[] = [];

  private readonly SCOPE = 'CHAT';
  private username: string;

  constructor(
    private route: ActivatedRoute,
    private subscribeGQL: SubscribeGQL,
    private publishGQL: PublishGQL,
  ) {
    this.route.data.subscribe(res => {
      console.log('', res)
    })
    this.username = this.route.snapshot.data['username'];
  }

  ngOnInit() {
    this.subscribeGQL
      .subscribe({
        filter: {
          scope: this.SCOPE,
        }
      })
      .pipe(map(data => data.data.subscribe))
      .subscribe(({type, payload, scope}) => this.handleMessage({type, payload, scope}));

    this.sendMessage('SYSTEM_MESSAGE', { message: `${this.username} joined the chat, say hi! 👋` }, this.SCOPE);
  }

  sendMessage(type: string, payload: any, scope?: string) {
    this.publishGQL
      .mutate({message: {type, payload, scope}})
      .subscribe();
  }


  handleAction({type, payload}) {
    switch (type) {
      case 'SYSTEM_MESSAGE':
        payload.username = '📢';
        payload.timestampe = Date.now();
        return this.sendMessage('SEND_MESSAGE', payload, this.SCOPE);
      case 'SEND_MESSAGE':
        payload.username = this.username;
        payload.timestampe = Date.now();
        return this.sendMessage('SEND_MESSAGE', payload, this.SCOPE);
      default:
        return console.log('Unhandled payload', {type, payload});
    }
  }

  handleMessage({type, payload, scope}) {
    switch (type) {
      case 'SYSTEM_MESSAGE':
      case 'SEND_MESSAGE':
        this.messages.push({type, payload});
        break;
      default:
        return console.log('Unhandled payload', {type, payload});
    }
  }
}
