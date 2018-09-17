import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { ChatIndexComponent } from './containers/chat-index/chat-index.component';
import { ChatUserComponent } from './containers/chat-user/chat-user.component';
import { UserResolver } from './resolvers/user.resolver';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'room',
      },
      {
        path: 'room',
        component: ChatIndexComponent,
        resolve: {
          username: UserResolver,
        }
      },
      {
        path: 'user',
        component: ChatUserComponent,
      }
    ])
  ],
  declarations: [ChatInputComponent, ChatMessagesComponent, ChatIndexComponent, ChatUserComponent ]
})
export class ChatModule {
}
