import { Injectable } from '@nestjs/common';
import { User } from "./user.interface";

@Injectable()
export class UserService {

  users: User[] = []

createUser(username: string): User {
    const user = {
      username,
      _id: this.users.length + 1
    }
    this.users.push(user)
    return user
  }

  getAllUsers() {
    return this.users
  }
}
