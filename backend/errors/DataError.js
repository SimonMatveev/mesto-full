class DataError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = 'DataError';
  }
}

module.exports = DataError;
