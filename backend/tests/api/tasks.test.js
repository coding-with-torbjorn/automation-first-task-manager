const request = require('supertest');
const app = require('../../app');

describe('POST /tasks', () => {
    test('should create a new task', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                title: 'Learn Jest'
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.title).toBe('Learn Jest');

        expect(response.body.completed).toBe(false);
    });
});