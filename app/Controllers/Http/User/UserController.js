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
}

module.exports = UserController;
