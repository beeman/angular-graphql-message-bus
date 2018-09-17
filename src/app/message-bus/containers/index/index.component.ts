import { Component, OnInit } from '@angular/core';
import { SubscribeGQL, PublishGQL } from '../../../generated/graphql';
import { map } from 'rxjs/operators';

class MessagePayload {
  type?: string;
  scope?: string;
  payload?: any;
}

@Component({
  selector: 'app-index',
  template: `
    <button (click)="ping()">
      PING
    </button>
    <table class="table">
      <tr *ngFor="let message of messages">
        <td>{{ message.scope }}</td>
        <td>{{ message.type }}</td>
        <td>{{ message.payload | json }}</td>
      </tr>
    </table>
  `,
})
export class IndexComponent implements OnInit {

  public messages: MessagePayload[] = [];

  constructor(
    private subscribeGQL: SubscribeGQL,
    private publishGQL: PublishGQL,
  ) {
    this.subscribeGQL
      .subscribe()
      .pipe(
        map(data => data.data.subscribe),
      )
      .subscribe(({ type, payload, scope }) => {
        this.messages = [{ type, payload, scope }, ...this.messages];
      });
  }

  ngOnInit() {
  }

  ping() {
    this.sendMessage('PING', { now: Date.now() }, 'TEST');
  }

  sendMessage(type: string, payload: any, scope?: string) {
    this.publishGQL
      .mutate({message: {type, payload, scope}})
      .subscribe(
        {
          next: res => console.log('sent', res),
          // complete: () => console.log('sent complete'),
        }
      );
  }
}
