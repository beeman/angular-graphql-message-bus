import { Injectable } from '@angular/core';

export const USERNAME_KEY = 'username';

@Injectable({ providedIn: 'root' })
export class ChatService {
  public getUsername() {
    return localStorage.getItem(USERNAME_KEY);
  }
  public setUsername(username) {
    return localStorage.setItem(USERNAME_KEY, username);
  }
}
