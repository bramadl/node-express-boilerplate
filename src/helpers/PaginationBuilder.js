class PaginationBuilder {
  /**
   * Sanitize the incoming query object.
   *
   * @param {Express.Request.Query} query - The request query object
   * @param {String | undefined} query.current_page - The current page value as string
   * @param {String | undefined} query.per_page - The per page value as string
   * @param {String | undefined} query.search - The search value as string
   * @return {Object}
   */
  sanitizeQuery(query) {
    const search = query.search ? query.search.trim() : '';
    const perPage = query.per_page ? parseInt(query.per_page, 10) : 10;
    const currentPage = query.current_page
      ? parseInt(query.current_page, 10)
      : 1;

    return {
      search,
      perPage,
      currentPage,
    };
  }

  /**
   * Build and return a pagination definition.
   *
   * @param {Number} currentPage - The current page
   * @param {Number} perPage - The per page
   * @param {Number} totalItems - The total items
   * @returns {Object}
   */
  buildPagination(currentPage, perPage, totalItems) {
    return {
      currentPage,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
    };
  }
}

module.exports = new PaginationBuilder();
