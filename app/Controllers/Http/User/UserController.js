/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async store({ request, response }) {
    const data = request.only(['email', 'password']);

    const userExist = await User.findBy('email', data.email);

    if (userExist) {
      return response.status(404).json({ error: 'User already exist' });
    }

    const user = await User.create(data);

    return user;
  }

  async update({ request, response, params }) {
    const data = request.all();

    if (!data) {
      return response.status(400).send({ error: 'Dados não enviados' });
    }

    const user = await User.findOrFail(params.id);

    if (!user) {
      return response.status(400).send({ error: 'Usuário inexistente' });
    }

    await user.merge(data);
    await user.save();

    return user;
  }
}

module.exports = UserController;
