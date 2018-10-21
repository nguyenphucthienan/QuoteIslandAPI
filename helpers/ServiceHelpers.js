class ServiceHelpers {
  static createSortObject(sortString) {
    return sortString.split('|')
      .reduce((order, item) => {
        const direction = item.charAt(0) === '-' ? -1 : 1;
        const field = item.substr(1);
        // eslint-disable-next-line no-param-reassign
        order[field] = direction;
        return order;
      }, {});
  }
}

module.exports = ServiceHelpers;
