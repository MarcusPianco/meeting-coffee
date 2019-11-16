/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Meeting extends Model {
  /**
   *
   * @method users
   *
   * @return {Object}
   */
  leader() {
    return this.belongsTo('App/Models/User', 'leader_id', 'id');
  }

  mediator() {
    return this.belongsTo('App/Models/User', 'mediator_id', 'id');
  }
}

module.exports = Meeting;