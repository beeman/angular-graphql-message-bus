import { Component, Input, OnInit } from '@angular/core';
import { MessagePayload } from '../../../generated/graphql';

@Component({
  selector: 'app-chat-messages',
  template: `
    <table class="table">
      <tr *ngFor="let message of messages">
        <td style="width: 100px">
          {{ message.payload.username }}
        </td>
        <td>
          {{ message.payload.message }}
        </td>
      </tr>
    </table>
  `,
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit {
  @Input() public messages: MessagePayload[] = [];

  constructor() { }

  ngOnInit() {
  }

}
