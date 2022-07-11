const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getAllImagesOfProduct(productId) {
  try {
    const res = await pool.query(
      "SELECT * from product_images WHERE product_id = $1",
      [productId]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function addImagesToProduct(productId, images) {
  const promises = [];
  images.forEach((element) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await pool.query(
          "INSERT INTO product_images VALUES ($1,$2)",
          [productId, element]
        );
        resolve();
        return res;
      } catch (error) {
        reject(new InternalServerErrorException());
      }
    });
    promises.push(promise);
  });
  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then((res) => {
        resolve();
      })
      .catch((err) => {
        reject();
      });
  });
}

module.exports = { addImagesToProduct, getAllImagesOfProduct };
