import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Posts API (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john' });
    jwtToken = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /posts (ดูโพสต์ทั้งหมด)', async () => {
    const res = await request(app.getHttpServer()).get('/posts').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /posts (สร้างโพสต์ใหม่)', async () => {
    const res = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'e2e test post',
        content: 'content for e2e test',
        category: 'Test',
      })
      .expect(201);
    expect(res.body.title).toBe('e2e test post');
    createdId = res.body.id;
  });

  it('GET /posts/:id (ดูโพสต์ตาม id)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/posts/${createdId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
    expect(res.body.id).toBe(createdId);
  });

  it('PUT /posts/:id (แก้ไขโพสต์)', async () => {
    const res = await request(app.getHttpServer())
      .put(`/posts/${createdId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'updated title',
      })
      .expect(200);
    expect(res.body.title).toBe('updated title');
  });

  it('GET /posts/author/:username (ดูโพสต์ของ author)', async () => {
    const res = await request(app.getHttpServer())
      .get('/posts/author/john')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((p: any) => p.author === 'John Swalobsky')).toBe(true);
  });

  it('DELETE /posts/:id (ลบโพสต์)', async () => {
    await request(app.getHttpServer())
      .delete(`/posts/${createdId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });
});
