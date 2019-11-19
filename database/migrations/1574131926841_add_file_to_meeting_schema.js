/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddFileToMeetingSchema extends Schema {
  up() {
    this.alter('meetings', table => {
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files');
    });
  }

  down() {
    this.alter('meetings', table => {
      table.dropColumn('file_id');
    });
  }
}

module.exports = AddFileToMeetingSchema;
