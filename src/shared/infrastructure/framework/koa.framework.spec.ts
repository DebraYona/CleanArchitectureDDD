import { startKoa } from '@/shared/infrastructure/framework/koa.framework';
import bodyParser from 'koa-bodyparser';
import supertest from 'supertest';
let app = startKoa();
let agent: supertest.SuperAgentTest;
beforeEach(() => {
  supertest(app);
  agent = supertest.agent(app.callback());
});

describe('Framework', () => {
  const request: supertest.SuperTest<supertest.Test> = supertest(
    app.callback()
  );

  it('Should return 404 code using agent', async () => {
    const response = await agent.post('/fakeRoute');
    expect(response).toBeDefined();
    expect(response.status).toBe(404);
    app.middleware.unshift(bodyParser());
  });
  it('Should return 404 code  & text plain', async () => {
    (request.get('/fakeRoute') as supertest.Test)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect('Content-Length', '9')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
      });
  });
  it('Should return 200 code', async () => {
    const response = await request.get('');
    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });
});
