class BasePolicy {
  async allRolesValid(role) {
    return ['Owner', 'Admin', 'Editor', 'Member'].includes(role);
  }

  ownerPrivileges(role) {
    return role === 'Owner';
  }

  adminPrivileges(role) {
    return role === 'Admin';
  }

  editorPrivileges(role) {
    return role === 'Editor';
  }

  memberPrivileges(role) {
    return role === 'Member';
  }
}

module.exports = BasePolicy;
