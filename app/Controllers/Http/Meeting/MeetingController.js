// const Database = use('Database');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Meeting = use('App/Models/Meeting');
class MeetingController {
  async index({ response }) {
    try {
      const meetings = await Meeting.query()
        .with('leader')
        .with('mediator')
        .fetch();

      return response.status(200).json({ meetings });
    } catch (err) {
      console.log(err);
    }
  }

  async show({ params }) {
    console.log(params);
    try {
      const meeting = await Meeting.findOrFail(params.id);

      await meeting.load('leader');
      await meeting.load('mediator');

      return meeting;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request }) {
    const data = request.all();
    const meeting = await Meeting.create({ ...data });

    const meetingDetails = await Meeting.query()
      .where('id', meeting.id)
      .with('leader')
      .with('mediator')
      .with('image')
      .fetch();

    return meetingDetails;
  }
}

module.exports = MeetingController;
