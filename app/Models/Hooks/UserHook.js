const UserHook = (exports = module.exports = {});

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

UserHook.hashPassword = async userinstance => {
  userinstance.password = await Hash.make(userinstance.password);
};
