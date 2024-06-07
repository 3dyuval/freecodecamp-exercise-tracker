import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ExerciseService } from "../exercise/exercise.service";
import { ExerciseModule } from "../exercise/exercise.module";

@Module({
  imports: [ExerciseModule],
  controllers: [UserController],
  providers: [UserService, ExerciseService]
})
export class UserModule {}
