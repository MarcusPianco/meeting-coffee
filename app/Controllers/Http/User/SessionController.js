/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    return response.status(200).json({ email, token });
  }
}

module.exports = SessionController;
