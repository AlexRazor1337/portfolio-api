module.exports = class Exception extends Error {
    constructor(status, message, stack) {
      super(Exception.name, message, stack);

      this.status = status;
      this.message = message;

      if (stack) this.err = stack;
    }
  };
