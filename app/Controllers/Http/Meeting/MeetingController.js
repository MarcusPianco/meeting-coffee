// const Database = use('Database');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Meeting = use('App/Models/Meeting');
const Mail = use('Mail');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Env = use('Env');
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

    // TODO
    // Here you need to refatoring Urgent,
    // please respect the Single responsability ;)
    // Convert Date Formatto dd/mm/yyyy
    // Build send emails using Queue strategy
    const users = await User.all();
    users.toJSON().forEach(async user => {
      await Mail.send(
        ['mail.mail_contact'],
        {
          meeting_date: meeting.date,
          meeting_topic: meeting.topic,
          link: `${Env.get('APP_URL')}/meetings/confirmation/${user.email}`,
        },
        message => {
          message
            .to(user.email)
            .from('contact@codecoffee.tech', 'CodeCoffee | Tech')
            .subject('Confirmação de Participação');
        }
      );
    });

    return meetingDetails;
  }
}

module.exports = MeetingController;
