import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ChatService } from '../services/chat.service';


@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<any> {

  constructor(
    private router: Router,
    private service: ChatService,
  ) {
  }

  resolve() {
    const username = this.service.getUsername();
    if (!username) {
      // console.log('no username',);
      this.router.navigate(['/chat/user']);
      return false;
    }
    console.log('username', username);
    return username;
  }
}
