import request from 'supertest';

const baseURL = 'http://localhost:3000';

const newEmployee = {
  empID: 1,
  projects: [],
};

const mockUser = {
  username: 'testUser',
  password: 'testpass123',
};

describe('Check Authorization "/api/employees/"', () => {
  it('should return UnauthorizedError [GET]/api/employees', async () => {
    const response = await request(baseURL).get('/api/employees/');
    expect(response.statusCode).toBe(401);
    expect(response.body.name).toBe('UnauthorizedError');
  });
  it('should return UnauthorizedError [GET]/api/employees/1', async () => {
    const response = await request(baseURL).get('/api/employees/1');
    expect(response.statusCode).toBe(401);
    expect(response.body.name).toBe('UnauthorizedError');
  });
  it('should return UnauthorizedError [POST]/api/employees/', async () => {
    const response = await request(baseURL).post('/api/employees/');
    expect(response.statusCode).toBe(401);
    expect(response.body.name).toBe('UnauthorizedError');
  });
  it('should return UnauthorizedError [PUT]/api/employees/', async () => {
    const response = await request(baseURL).put('/api/employees/1');
    expect(response.statusCode).toBe(401);
    expect(response.body.name).toBe('UnauthorizedError');
  });
  it('should return UnauthorizedError [DELETE]/api/employees/', async () => {
    const response = await request(baseURL).delete('/api/employees/1');
    expect(response.statusCode).toBe(401);
    expect(response.body.name).toBe('UnauthorizedError');
  });
});

describe('EmployeesController', () => {
  let token = '';
  beforeAll(async () => {
    await request(baseURL).post('/api/auth/register').send(mockUser);

    const response = await request(baseURL)
      .post('/api/auth/login')
      .send(mockUser);

    token = response.body.accessToken;
  });

  it('[DELETE]/api/employees/1 should return 200', async () => {
    const response = await request(baseURL)
      .delete('/api/employees/1')
      .set('Authorization', `Bearer ${token}`);
    expect(
      response.statusCode === 200 || response.statusCode === 404
    ).toBeTruthy();
  });

  it('[POST]/api/employees/ should return 200', async () => {
    const response = await request(baseURL)
      .post('/api/employees/')
      .set('Authorization', `Bearer ${token}`)
      .send(newEmployee);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Employee saved...');
  });

  it('[GET]/api/employees/ should return Array', async () => {
    const response = await request(baseURL)
      .get('/api/employees/')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('[GET]/api/employees/ should return Array w/ length >= 1', async () => {
    const response = await request(baseURL)
      .get('/api/employees/')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length >= 1).toBeTruthy();
  });

  it('[PUT]/api/employees/1 should return 200', async () => {
    const response = await request(baseURL)
      .put('/api/employees/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...newEmployee, projects: [1] });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Employee updated...');
  });

  it('[GET]/api/employees/1 should return the updated employee', async () => {
    const response = await request(baseURL)
      .get('/api/employees/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.projects)).toBeTruthy();
    expect(response.body.projects.includes(1)).toBeTruthy();
  });

  it('[DELETE]/api/employees/1 should return 200', async () => {
    const response = await request(baseURL)
      .delete('/api/employees/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  it('[GET]/api/employees/1 should return 404', async () => {
    const response = await request(baseURL)
      .get('/api/employees/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });
});
