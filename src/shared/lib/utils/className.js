/**
 * A function for joining class names
 *
 * @param  {...any} args Strings, booleans, arrays, or objects that need to be joined
 * @returns {string} A string with joined classnames
 */
export const cl = (...args) => {
  const classNames = [];

  args.forEach((arg) => {
    if (!arg) {
      return;
    }

    if (typeof arg === 'string' || typeof arg === 'number') {
      classNames.push(arg);
      return;
    }

    if (Array.isArray(arg)) {
      classNames.push(cl(...arg));
      return;
    }

    if (typeof arg === 'object') {
      for (const className in arg) {
        if (
          Object.prototype.hasOwnProperty.call(arg, className) &&
          arg[className]
        ) {
          classNames.push(className);
        }
      }

      return;
    }
  });

  return classNames.join(' ');
};
