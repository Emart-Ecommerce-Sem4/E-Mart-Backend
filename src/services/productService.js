const uuid = require("uuid");
const yup = require("yup");

const productRepository = require("../repositories/productRepository");
const generateOutput = require("../utils/outputFactory");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

const productAddSchema = yup.object().shape({
  name: yup.string().required().max(30),
  description: yup.string().required(),
  categoryId: yup.string().required(),
  quantityInStock: yup.number(),
  unitPrice: yup.number(),
  variantId: yup.string().required(),
});

async function addProduct(values) {
  try {
    await productAddSchema.validate({ ...values });
  } catch (error) {
    return generateOutput(400, "Validation error", error);
  }
  const product = {
    id: uuid.v4(),
    ...values,
  };
  try {
    const result = await productRepository.addProduct(product);
    return generateOutput(201, "Product Added Succesfully", {
      product: product,
    });
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception

      return generateOutput(500, "Error in adding the product", error.message);
    }
    return generateOutput(
      400,
      "Error in adding the product",
      "An error occured!"
    );
  }
}

module.exports = { addProduct };
