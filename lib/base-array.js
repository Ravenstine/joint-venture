'use strict';

/**
 * Makes arrays easier to work with.
 * @class
 * @extends Array
 * @property last      - Returns the last array element.
 * @property first     - Returns the first array element.
 */
class BaseArray extends Array {
  get last(){
    return this.slice(-1).pop();
  }
  get first() {
    return this[0];
  }
  /**
   * Destructive version of concat().  You can also think of it as a "push many".
   * @method
  */
  dconcat(ary) {
    this.push.apply(this, ary);
    return this;
  }
}

module.exports = BaseArray;

