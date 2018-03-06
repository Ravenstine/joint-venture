'use strict';

const getKeypath = require('keypather/get'),
      setKeypath = require('keypather/set'),
      delKeypath = require('keypather/del');

/**
 * A basic object but with dot-notation getters and setters, the purpose of which is to provide a somewhat
 * failsafe interface that can also be overridden in cases such as the Context, which overrides the set()
 * method in order to keep track of what properties have been altered.
 * @class
 * @property methods {Array} - Returns all available methods to the object.
 */

class BaseObject {
  /**
    Creates a new instance of the class.
    @function
    @param {...args} - Arguments to be handed to the constructor
   */
  static create(...args){
    return new this(...args);
  }
  /**
   * Extends from one or more objects.
   * @function
   * @param {...Object} objects - The class(es) to be extended.
   * @example
   * // class SomeObject extends BaseObject.mixin(AnotherObject, AndAnotherObject) {
   * //   hello(){
   * //     return 'world';
   * //   }
   * // }
  */
  static mixin(...objects){
    const constructors = [];
    class Class extends this {
      constructor(...opts) {
        super(...opts);
        let prev = {};
        objects.reverse().forEach(obj => {
          const proto = (obj.prototype || obj),
                props = Object.getOwnPropertyNames(proto);
          props.forEach(prop => {
            if (prop === 'constructor') {
              constructors.push(proto.constructor);
            } else {
              Class.prototype[prop] = proto[prop];
            }
          });
        });
        constructors.forEach(constructor => {
          Object.assign(Class.prototype, new constructor(...opts));
        });
      }
    }
    return Class;
  }
  get methods(){
    let props = [],
        obj   = this;
    do {
      props = props.concat(Reflect.getPrototypeOf(obj));
    } while (obj = Reflect.getPrototypeOf(obj));

    return [...new Set(props.filter(m => m)
                .map(proto => Object.getOwnPropertyNames(proto))
                .reduce((a,b) => a.concat(b))
                .filter(m => !m.match('constructor'))
                .sort()
           )];
  }
  /**
   * Gets a property through a dot notation string.
   * @method
   * @param {string} key          - A dot-notation string signifying the path to a value.
   * @param {object} defaultValue - A default object to return if nothing exists under the provided key path.
   * @example 
   * // let something = new BaseObject();
   * // something.set('a', {b: {c: 'd'}});
   * // something.get('a.b.c'); // 'd'
  */
  get(key, defaultValue){
    let val = getKeypath(this, key);
    return (val !== void(0)) ? val : defaultValue;
  }
  /**
   * Sets a property through a dot notation string.
   * @method
   * @param {string} key   - A dot-notation string signifying the path to a value.
   * @param {object} value - The value to place under the given key path.
   * @example 
   * // let something = new BaseObject();
   * // something.set('a', {b: {c: 'd'}});
  */
  set(key, value){
    return setKeypath(this, key, value);
  }
  /**
   * Same as set(), except it will not overwrite an existing value under the provided key path.
   * @method
   * @param {string} key   - A dot-notation string signifying the path to a value.
   * @param {object} value - The value to place under the given key path.
  */
  setUnlessExists(key, value){
    if(!this.get(key)) return setKeyPath(key, value);
  }
  /**
   * Deletes a property and its key.
   * @method
   * @param {string} key   - A dot-notation string signifying the path to a value.
  */
  del(key){
    return delKeypath(this, key);
  }
}

module.exports = BaseObject;

