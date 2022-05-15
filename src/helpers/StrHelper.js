class StrHelper {
  /**
   * Make an empty string be a null.
   *
   * @param {String | undefined | null} string - The string to be nullified.
   * @return {String | null}
   */
  nullifyEmptyString(string) {
    if (string === null) {
      return null;
    }

    if (typeof string === 'undefined') {
      return null;
    }

    if (typeof string === 'string') {
      return string.length > 0 ? String(string) : null;
    }

    // Any other types other than null, undefined, string.
    return null;
  }

  /**
   * Generate a random string.
   *
   * @param {Number} length - The length of generated random string.
   * @param {Object} options - The randomize simple algorithm option.
   * @param {String} options.characters - The valid and allowed characters.
   * @param {Boolean} options.unique - The generated string should be unique on each character.
   * @returns {String}
   */
  generateRandomString(
    length = 16,
    options = {
      characters:
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      unique: false,
    },
  ) {
    const characters = options.characters.split('');
    let result = '';

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      result += characters[index];
      if (options.unique) characters.splice(index, 1);
    }

    return result;
  }
}

module.exports = new StrHelper();
