const BasePolicy = require('../BasePolicy');

class UserPolicy extends BasePolicy {
  getUsers(role) {
    return super.allRolesValid(role);
  }

  getUserById(role) {
    return super.allRolesValid(role);
  }

  createUser(role) {
    return super.ownerPrivileges(role);
  }

  updateUser(role) {
    return super.ownerPrivileges(role);
  }

  deleteUser(role) {
    return super.ownerPrivileges(role);
  }
}

module.exports = new UserPolicy();
