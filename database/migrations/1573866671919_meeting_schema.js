/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MeetingSchema extends Schema {
  up() {
    this.create('meetings', table => {
      table.increments();
      table.date('date');
      table
        .integer('leader_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users');
      table
        .integer('mediator_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users');
      table.string('topic').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('meetings');
  }
}

module.exports = MeetingSchema;
