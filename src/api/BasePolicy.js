class BasePolicy {
  static allRoles = ['Owner', 'Admin', 'Editor', 'Member'];

  /**
   * Get the user's role from the given token.
   *
   * @param {String} token - The valid JWT token
   * @returns {String}
   */
  getRoleFromToken(token) {
    // @TODO:
    // Parse the JWT token here then return the role
    // eslint-disable-next-line no-console
    console.log({ token });
    return 'Owner';
  }
}

module.exports = BasePolicy;
