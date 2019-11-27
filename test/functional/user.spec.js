/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const { test, trait } = use('Test/Suite')('User');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('shuold create user using api resources', async ({ assert, client }) => {
  const user = {
    email: 'pianco@gmail.com',
    password: '123456',
  };
  const response = await client
    .post('/users')
    .send(user)
    .end();
  response.assertStatus(200);
  assert.exists(response.body.id);
});

test('shuold failure when create already exist user', async ({
  assert,
  client,
}) => {
  await Factory.model('App/Models/User').create({
    email: 'marcus2.ufal@gmail.com',
  });
  const userExist = {
    email: 'marcus2.ufal@gmail.com',
    password: '123456',
  };
  const response = await client
    .post('/users')
    .send(userExist)
    .end();
  response.assertStatus(404);
  assert.exists(response.body.error);
});

test('shuold update user', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    email: 'marcus2.ufal@gmail.com',
  });
  const userDataUpdate = {
    email: 'marcus2.ufal@gmail.com',
    password: '123456',
  };
  const response = await client
    .post(`/users/${user.id}`)
    .send(userDataUpdate)
    .end();
  response.assertStatus(200);
  assert.exists(response.body.id);
});
