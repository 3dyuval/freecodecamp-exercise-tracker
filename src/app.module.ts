import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [UserModule, ExerciseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
