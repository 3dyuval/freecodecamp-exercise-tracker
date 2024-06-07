import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { ExerciseService } from "../exercise/exercise.service";
import { Exercise } from "../exercise/exercise.interface";
import { validate } from "typia";


@Controller('/api/users/')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly exerciseService: ExerciseService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return this.userService.getAllUsers()
  }

  @Post()
  @HttpCode(HttpStatus.BAD_REQUEST)
  async missingFields(fields) {
    return { error: `Missing required fields: ${fields}` };
  }

  @Post(':username')
  async postUser(
    @Param('username') username: string,
    @Res({ passthrough: true }) res: Response
  )  {


    if (!username) {
       res.status(HttpStatus.BAD_REQUEST)
       return this.missingFields('username')
    }

    const user = this.userService.createUser(username)
    return res.status(HttpStatus.CREATED)
      .send(user)

  }


  @Post(":username/exercises")
  async postExercise(
    @Param("username") username: string,
    @Res({ passthrough: true }) res: Response,
    @Body() body?: Exercise
  ) {


    const validation = this.exerciseService.validateExercise(body);

    if (validation !== true) {
      res.status(HttpStatus.BAD_REQUEST)
        .send(validation);
    }

    const user = this.userService.createUser(username);
    return res.status(HttpStatus.CREATED)
      .send(user);
  }

}
