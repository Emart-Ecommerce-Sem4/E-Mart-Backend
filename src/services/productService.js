const uuid = require("uuid");
const yup = require("yup");

const productRepository = require("../repositories/productRepository");
const imageRepository = require("../repositories/imageRepository");
const generateOutput = require("../utils/outputFactory");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

const productAddSchema = yup.object().shape({
  title: yup.string().required().max(50),
  weight: yup.number().required(),
  sku: yup.string().required(),
  categoryId: yup.string().required(),
  subCategoryId: yup.string().required(),
});

async function getProductsForSubCategory(subCategoryId) {
  try {
    const res = await productRepository.getProductsForSubCategory(
      subCategoryId
    );
    return generateOutput(200, "Products fetched succesfully!", {
      products: res.rows,
    });
  } catch (error) {
    return generateOutput(500, "Internal Server Error!", { error });
  }
}

async function getProductsForCategory(categoryId) {
  try {
    const res = await productRepository.getProductsForCategory(categoryId);
    return generateOutput(200, "Products fetched succesfully!", {
      products: res.rows,
    });
  } catch (error) {
    return generateOutput(500, "Internal Server Error!", { error });
  }
}

async function getProductImages(productId) {
  try {
    const res = await imageRepository.getAllImagesOfProduct(productId);
    return generateOutput(200, "Images fetched succesfully!", {
      images: res.rows,
    });
  } catch (error) {
    return generateOutput(500, "Internal Server Error!", { error });
  }
}

async function getProduct(id) {
  try {
    const res = await productRepository.getProductById(id);
    if (res.rowCount) {
      const imageRes = await imageRepository.getAllImagesOfProduct(
        res.rows[0]?.product_id
      );
      return generateOutput(200, "Product fetched succesfully!", {
        product: { ...res.rows[0], images: imageRes.rows },
      });
    } else {
      return generateOutput(404, "Product not found");
    }
  } catch (error) {
    return generateOutput(500, "Internal server error!", { error });
  }
}

async function getAllProducts() {
  try {
    const res = await productRepository.getAllProducts();
    return generateOutput(200, "Products fetched succesfully!", {
      products: res.rows,
    });
  } catch (error) {
    return generateOutput(500, "Error occured while getting the products", {
      error,
    });
  }
}

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
    const resultImages = await imageRepository.addImagesToProduct(
      product.id,
      values.images
    );

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
async function updateProduct(values) {
  try {
    await productAddSchema.validate({ ...values });
  } catch (error) {
    return generateOutput(400, "Validation error", error.message);
  }
  try {
    const reslt = await productRepository.getProductById(values.productId);
    if (reslt.rowCount == 0) {
      return generateOutput(400, "product not exist exists");
    }
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception
      return generateOutput(
        500,
        "Error in updating the product",
        error.message
      );
    }

    return generateOutput(
      400,
      "Error in updating the product",
      "An error occured!"
    );
  }
  try {
    const result = await productRepository.updateProduct(values);
    return generateOutput(201, "Product Updated Succesfully", values);
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception

      return generateOutput(
        500,
        "Error in updating the product",
        error.message
      );
    }
    console.log(error);
    return generateOutput(
      400,
      "Error in updating the product",
      "An error occured!"
    );
  }
}
module.exports = {
  addProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  getProductImages,
  getProductsForCategory,
  getProductsForSubCategory,
};
