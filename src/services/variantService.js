const uuid = require("uuid");

const variantRepository = require("../repositories/variantRepository");
const generateOutput = require("../utils/outputFactory");

async function addVariant(values) {
  try {
    const res = await variantRepository.getVaraintByType(values.type);
    if (res.rowCount !== 0) {
      return generateOutput(400, "Variant Already Exists");
    }
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception

      return generateOutput(500, "Error in adding the variant", error.message);
    }
    return generateOutput(
      400,
      "Error in adding the variant",
      "An error occured!"
    );
  }
  const variant = {
    id: uuid.v4(),
    type: values.type,
  };
  try {
    const res = await variantRepository.addVariant(variant);
    return generateOutput(201, "Variant added succesfully!", {
      variant,
    });
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception

      return generateOutput(500, "Error in adding the variant", error.message);
    }
    return generateOutput(
      400,
      "Error in adding the variant",
      "An error occured!"
    );
  }
}

module.exports = {
  addVariant,
};
