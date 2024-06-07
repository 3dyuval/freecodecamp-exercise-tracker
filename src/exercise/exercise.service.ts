import { Injectable } from '@nestjs/common';
import { Exercise } from "./exercise.interface";
import { validate } from "typia";

@Injectable()
export class ExerciseService {

  exercises: Exercise[] = []

  validateExercise(exercise: unknown) {
    const validation = validate<Omit<Exercise, '_id'>>(exercise);
    if (!validation.success) {
      return { error: validation.errors };
    }
    return true
  }

  createExercise(exercise: Exercise): Exercise {
    this.exercises.push(exercise)
    return exercise
  }

  getAllExercises() {
    return this.exercises
  }
}
