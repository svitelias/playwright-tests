const { test, expect } = require('@playwright/test');

test.describe('Cars API', () => {
  let request;
  let cookie;

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext({
      baseURL: process.env.BASE_URL,
      httpCredentials: {
        username: process.env.HTTP_USERNAME,
        password: process.env.HTTP_PASSWORD,
      },
    });

    const signinResponse = await request.post('/api/auth/signin', {
      data: {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
        remember: false,
      },
    });
    expect(signinResponse.status()).toBe(200);
    const headers = signinResponse.headers();
    cookie = headers['set-cookie'];
  });

  test.afterAll(async () => {
    await request.dispose();
  });

  test('positive - should create a car successfully', async () => {
    const response = await request.post('/api/cars', {
      headers: { Cookie: cookie },
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 1000,
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.data).toHaveProperty('id');
    expect(body.data.carBrandId).toBe(1);
    expect(body.data.carModelId).toBe(1);
    expect(body.data.mileage).toBe(1000);
  });

  test('negative - should return 400 when mileage is missing', async () => {
    const response = await request.post('/api/cars', {
      headers: { Cookie: cookie },
      data: {
        carBrandId: 1,
        carModelId: 1,
      },
    });
    expect(response.status()).toBe(400);
  });

  test('negative - should return 400 when carBrandId is invalid', async () => {
    const response = await request.post('/api/cars', {
      headers: { Cookie: cookie },
      data: {
        carBrandId: 999,
        carModelId: 1,
        mileage: 1000,
      },
    });
    expect(response.status()).toBe(404);
  });
});
