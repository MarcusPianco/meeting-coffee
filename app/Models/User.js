/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {
  static boot() {
    super.boot();
    this.addTrait('@provider:Timezone/Trait');

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', 'UserHook.hashPassword');
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  meetings() {
    return this.belongsToMany('App/Models/Meeting', 'meeting_id')
      .pivotTable('user_meetings')
      .withTimestamps();
  }
}

module.exports = User;
