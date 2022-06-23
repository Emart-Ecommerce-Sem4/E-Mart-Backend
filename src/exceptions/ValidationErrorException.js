class InternalServerErrorException extends Error {
  constructor() {
    super("Validation Error");
    this.name = "Validation Error";
    this.message = 400;
  }
}

module.exports = { InternalServerErrorException };
