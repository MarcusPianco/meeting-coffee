const User = use('App/Models/User');
const Mail = use('Mail');
const Env = use('Env');
class MeetingConfirmation {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'MeetingConfirmation-job';
  }

  // This is where the work is done.
  async handle({ topic, date }) {
    const users = await User.all();
    users.toJSON().forEach(async user => {
      await Mail.send(
        ['mail.mail_contact'],
        {
          meeting_date: date,
          meeting_topic: topic,
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
  }
}

module.exports = MeetingConfirmation;
