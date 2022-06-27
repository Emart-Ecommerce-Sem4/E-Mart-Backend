const uuid = require("uuid");
const yup = require("yup");

const reviewRepository = require("../repositories/reviewRepository");
const generateOutput = require("../utils/outputFactory");

const reviewAddSchema = yup.object().shape({
  userId: yup.string().required(),
  productId: yup.string().required(),
  rating: yup.string().required(),
  description: yup.string().required(),
});

async function addReview(values) {
  try {
    await reviewAddSchema.validate({
      userId: values.userId,
      productId: values.productId,
      rating: values.rating,
      description: values.description,
    });
  } catch (error) {
    return generateOutput(400, "Validation error!", error.errors);
  }
  try {
    const review = { id: uuid.v4(), ...values };
    const res = await reviewRepository.addReview(review);
    return generateOutput(201, "Review added succesfully", { review });
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

module.exports = { addReview };
