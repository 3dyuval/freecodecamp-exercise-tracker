import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/api/users (POST) should return error bad request", () => {
    return request(app.getHttpServer())
      .post("/api/users/")
      .expect(400)
      .expect({ error: "Missing required fields: username" });
  });

  it("/api/users (POST) should return 201 and user id", () => {
    return request(app.getHttpServer())
      .post("/api/users/yo")
      .expect(201)
      .expect({
        username: "yo",
        _id: 1
      });
  });
});
