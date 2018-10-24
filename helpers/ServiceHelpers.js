class ServiceHelpers {
  static createQuoteFilterObject(filterString) {
    if (!filterString) {
      return {};
    }

    return filterString.split('|')
      .reduce((filterObj, item) => {
        const splitedItem = item.split(':');
        const key = splitedItem[0];
        const value = splitedItem[1];

        const newFilterObject = { ...filterObj };

        if (key === 'text') {
          newFilterObject[key] = new RegExp(value, 'i');
        } else {
          newFilterObject[key] = value;
        }

        return newFilterObject;
      }, {});
  }

  static createAuthorFilterObject(filterString) {
    if (!filterString) {
      return {};
    }

    return filterString.split('|')
      .reduce((filterObj, item) => {
        const splitedItem = item.split(':');
        const key = splitedItem[0];
        const value = splitedItem[1];

        const newFilterObject = { ...filterObj };

        if (key === 'fullName') {
          newFilterObject[key] = new RegExp(value, 'i');
        } else {
          newFilterObject[key] = value;
        }

        return newFilterObject;
      }, {});
  }

  static createCategoryFilterObject(filterString) {
    if (!filterString) {
      return {};
    }

    return filterString.split('|')
      .reduce((filterObj, item) => {
        const splitedItem = item.split(':');
        const key = splitedItem[0];
        const value = splitedItem[1];

        const newFilterObject = { ...filterObj };

        if (key === 'name') {
          newFilterObject[key] = new RegExp(value, 'i');
        } else {
          newFilterObject[key] = value;
        }

        return newFilterObject;
      }, {});
  }

  static createSortObject(sortString) {
    if (!sortString) {
      return { createdAt: -1 };
    }

    return sortString.split('|')
      .reduce((sortObj, item) => {
        const key = item.substr(1);
        const value = item.charAt(0) === '-' ? -1 : 1;

        const newSortObj = { ...sortObj };
        newSortObj[key] = value;
        return newSortObj;
      }, {});
  }
}

module.exports = ServiceHelpers;
