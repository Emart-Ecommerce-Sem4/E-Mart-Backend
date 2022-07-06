const uuid = require("uuid");

const variantRepository = require("../repositories/variantRepository");
const generateOutput = require("../utils/outputFactory");
const yup = require("yup");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

const variantAddSchema = yup.object().shape({
  productId: yup.string().required(),
  description: yup.string().required(),
  variantType: yup.string().required(),
  quantity_in_stock: yup.number().required(),
  unit_price: yup.number().required(),
});

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
    await variantAddSchema.validate({
      ...values,
    });
  } catch (error) {
    return generateOutput("Validation Error", 400, { error: error.errors });
  }
  try {
    const res = await variantRepository.getVaraintByType(values.variantType);
    if (res.rowCount !== 0) {
      return generateOutput(400, "Variant Already Exists");
    } else {
      const data = {
        variantId: uuid.v4(),
        ...values,
      };
      const result = await variantRepository.addVariant(data);
      return generateOutput(201, "Variant added succesfully!", {
        variant: data,
      });
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
