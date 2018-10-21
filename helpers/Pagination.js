class Pagination {
  constructor(totalCount, pageNumber, pageSize) {
    this.totalCount = totalCount;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
  }
}

module.exports = Pagination;
