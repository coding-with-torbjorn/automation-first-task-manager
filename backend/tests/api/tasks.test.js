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

    test('should throw exception when creating a new task without a title', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({});

        expect(response.statusCode).toBe(400);
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

describe('PUT /tasks/:id', () => {
    test('should update an existing task', async () => {
        // 1. Create a task first
        const createResponse = await request(app)
            .post('/tasks')
            .send({
                title: 'Original Task'
            });

        const taskId = createResponse.body.id;

        // 2. Update the task
        const updateResponse = await request(app)
            .put(`/tasks/${taskId}`)
            .send({
                title: 'Updated Task',
                completed: true
            });

        // 3. Assertions
        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body.title).toBe('Updated Task');
        expect(updateResponse.body.completed).toBe(true);
    });

    //TODO: Add test case for when task does not exist in array
});