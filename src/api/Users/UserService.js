/* eslint-disable no-console */
class UserService {
  /**
   * Retrieve all the users data from database
   * with pagination strategy.
   *
   * @param {Express.Request.Query} query - The request query object
   * @param {String | undefined} query.per_page - The per page value as string
   * @param {String | undefined} query.current_page - The current page value as string
   * @param {String | undefined} query.search - The search value as string
   * @return {Promise<User[]>}
   */
  async getAllUsers(query) {
    console.log({ query });
  }

  /**
   * Retrieve a user data from database
   * with the given id.
   *
   * @param {String} userId - The user id
   * @return {Promise<User>}
   */
  async getUserById(userId) {
    console.log({ userId });
  }

  /**
   * Create a new user data to database
   * with the given request body.
   *
   * @param {Object} userBody - The request body payload
   * @param {String} userBody.name - The user name
   * @param {String} userBody.email - The user email
   * @param {String | undefined} userBody.phone - The user phone
   * @return {Promise<User>}
   */
  async createUser(userBody) {
    console.log({ userBody });
  }

  /**
   * Update the user data from database
   * with the given id and request body.
   *
   * @param {String} userId - The user id
   * @param {Object} userBody - The request body payload
   * @param {String} userBody.name - The user name
   * @param {String} userBody.email - The user email
   * @param {String | undefined} userBody.phone - The user phone
   * @return {Promise<User>}
   */
  async updateUser(userId, userBody) {
    console.log({ userId, userBody });
  }

  /**
   * Delete a user data from database
   * with the given id.
   *
   * @param {String} userId - The user id
   * @return {Promise<User>}
   */
  async deleteUser(userId) {
    console.log({ userId });
  }
}

module.exports = new UserService();
