const uuid = require("uuid");

const variantRepository = require("../repositories/variantRepository");
const generateOutput = require("../utils/outputFactory");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getVariant(variantId) {
  try {
    const res = await variantRepository.getVaraintById(variantId);
    if (res.rows.length > 0) {
      return generateOutput(200, "Variant fetched succesfully", {
        variant: res.rows[0],
      });
    } else {
      return generateOutput(200, "Variant do not found!", {
        variant: null,
      });
    }
  } catch (error) {
    return generateOutput(500, "Internal Server Error", { error });
  }
}

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

async function updateVariant(values) {
  try {
    const res = await variantRepository.getVaraintById(values.id);
    if (res.rowCount == 0) {
      return generateOutput(400, "Variant Not Exists");
    }
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception

      return generateOutput(
        500,
        "Error in updating the variant",
        error.message
      );
    }
    return generateOutput(
      400,
      "Error in updating the variant",
      "An error occured!"
    );
  }

  try {
    const res = await variantRepository.updateVariant(values);
    return generateOutput(201, "Variant updated succesfully!", values);
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception

      return generateOutput(
        500,
        "Error in updating the variant",
        error.message
      );
    }
    console.log(error);
    return generateOutput(
      400,
      "Error in updating the variant",
      "An error occured!"
    );
  }
}

module.exports = {
  addVariant,
  updateVariant,
  getVariant,
};
