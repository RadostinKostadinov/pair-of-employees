import { Service } from 'typedi';

import User from '@/interfaces/userInterface';

@Service()
export class userService {
  private users: User[] = [];

  doesUserExist(username: string): boolean {
    return this.users.some((u) => u.username === username);
  }

  addUser(user: User) {
    this.users.push(user);
  }

  getUser(username: string) {
    return this.users.find((u) => u.username === username);
  }
}
