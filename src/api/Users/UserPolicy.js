const BasePolicy = require('../BasePolicy');

class UserPolicy extends BasePolicy {
  getUsers(token) {
    const role = super.getRoleFromToken(token);
    return BasePolicy.allRoles.includes(role);
  }

  getUserById(token) {
    const role = super.getRoleFromToken(token);
    return BasePolicy.allRoles.includes(role);
  }

  createUser(token) {
    const role = super.getRoleFromToken(token);
    return role === 'Super Admin';
  }

  updateUser(token) {
    const role = super.getRoleFromToken(token);
    return role === 'Super Admin';
  }

  deleteUser(token) {
    const role = super.getRoleFromToken(token);
    return role === 'Super Admin';
  }
}

module.exports = new UserPolicy();
