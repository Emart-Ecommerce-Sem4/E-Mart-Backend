class InternalServerErrorException extends Error {
  constructor() {
    super("Internal Server Error");
    this.name = "Internal Server Error";
    this.message = 500;
  }
}

module.exports = { InternalServerErrorException };