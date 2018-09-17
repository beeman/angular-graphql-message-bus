import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-user',
  template: `
    <div class="card m-4">
      <div class="card-header">
        Hey there! What's your name?
      </div>
      <div class="card-body">
        <input class="username form-control input-lg bg-light text-white border-secondary" type="text" placeholder="Call me..."
               #username (keyup.enter)="setName();"/>
      </div>
    </div>
  `,
  styles: []
})
export class ChatUserComponent implements OnInit {
  @ViewChild('username') username: ElementRef<HTMLInputElement>;
  constructor(
    private router: Router,
    private service: ChatService,
  ) { }

  ngOnInit() {
    const username = this.service.getUsername();

    if (username) {
      this.username.nativeElement.value = username;
    }

    setTimeout(() => this.username.nativeElement.focus(), 300);
  }

  setName() {
    this.service.setUsername(this.username.nativeElement.value);
    this.router.navigate(['/chat']);
  }

}
