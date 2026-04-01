const request = require('supertest');
const app = require('../src/app');

describe('Task API Tests', () => {
      it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test task', priority: 'high' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test task');
  });

    it('should return paginated tasks correctly', async () => {
    for (let i = 0; i < 15; i++) {
      await request(app).post('/tasks').send({ title: `Task ${i}` });
    }

    const res = await request(app).get('/tasks?page=1&limit=10');
    expect(res.body.length).toBe(10);
  });

    it('should not change priority when completing task', async () => {
    const create = await request(app)
      .post('/tasks')
      .send({ title: 'Priority test', priority: 'high' });

    const id = create.body.id;

    const complete = await request(app).patch(`/tasks/${id}/complete`);
    expect(complete.body.priority).toBe('high');
  });

    it('should assign a task to a user', async () => {
    const create = await request(app)
      .post('/tasks')
      .send({ title: 'Assign test' });

    const id = create.body.id;

    const res = await request(app)
      .patch(`/tasks/${id}/assign`)
      .send({ user: 'Krishna' });

    expect(res.body.assignedTo).toBe('Krishna');
  });
});