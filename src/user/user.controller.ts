import { Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { User } from "./user.interface";

@Controller('/api/users/')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return this.userService.getAllUsers()
  }

  @Post()
  @HttpCode(HttpStatus.BAD_REQUEST)
  async missingField() {
    return { error: "Missing required fields: username" }
  }

  @Post(':username')
  async postUser(
    @Param('username') username: string,
    @Res({ passthrough: true }) res: Response
  )  {

    if (!username) {
       res.status(HttpStatus.BAD_REQUEST)
       return this.missingField()
    }

    const user = this.userService.createUser(username)
    return res.status(HttpStatus.CREATED)
      .send(user)

  }
}
