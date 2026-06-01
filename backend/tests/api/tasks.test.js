const request = require('supertest');
const app = require('../../app');

//TODO: Delete tasks in a different way (inefficient to make HTTP request when deleting tasks)
afterEach(async () => {
    await request(app)
        .delete('/tasks');
});
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

describe('GET /tasks', () => {
    test('should retrieve all tasks', async () => {
        await request(app)
            .post('/tasks')
            .send({
                title: 'This is a POST request for testing the GET reqest'
            });
        
        const response = await request(app)
            .get('/tasks');

        expect(response.statusCode).toBe(200);

        expect(response.body[0].title).toBe('This is a POST request for testing the GET reqest');
    });
});