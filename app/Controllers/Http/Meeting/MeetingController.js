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

  async show({ params, response }) {
    try {
      const meeting = await Meeting.query()
        .where('id', params.meeting_id)
        .with('leader')
        .with('mediator')
        .fetch();

      return response.status(200).json({ meeting });
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
      .fetch();

    return meetingDetails;
  }
}

module.exports = MeetingController;
