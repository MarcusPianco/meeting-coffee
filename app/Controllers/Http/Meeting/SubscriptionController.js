/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Meeting = use('App/Models/Meeting');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/**
 * Resourceful controller for interacting with subscriptions
 */

class SubscriptionController {
  async store({ request, params, response }) {
    const user_id = request.input('user_id');
    const { meetings_id } = params;
    try {
      const meetingValid = await Meeting.find(meetings_id);
      if (
        Number(new Date(meetingValid.date)) < Number(new Date()) ||
        !meetingValid
      ) {
        return response
          .status(400)
          .json({ notification: 'The meeting has occured or deleted' });
      }
      const userExist = await User.findByOrFail('id', user_id);
      await meetingValid.users().save(userExist);

      return response.status(201).json({ ok: 'Subscription was accept' });
    } catch (err) {
      console.log(err);
    }
  }

  // async show({ params }) {}

  // async update({ params, request, response }) {}

  // async destroy({ params }) {}
}

module.exports = SubscriptionController;
