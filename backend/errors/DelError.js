class DelError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
    this.name = 'DelError';
  }
}

module.exports = DelError;
