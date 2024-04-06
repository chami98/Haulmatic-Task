const request = require('supertest');
const app = require('../App');

// Test login endpoint
describe('POST /signin', () => {
    test('responds with 200 OK and a token when valid credentials are provided', async () => {
        const response = await request(app)
            .post('/signin')
            .send({ username: 'haulmatic', password: '123456' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

});

