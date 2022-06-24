const uuid = require("uuid");
const generateOutput = require("../utils/outputFactory");

const categoryRepository = require("../repositories/categoryRepository");

const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getAllCategories() {
  try {
    const res = await categoryRepository.getAllCategories();
    return generateOutput(200, "All categories succesfully received", res.rows);
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception
      return generateOutput(
        500,
        "Error in getting the categories",
        error.message
      );
    }
    return generateOutput(
      400,
      "Error in getting the categories",
      "An error occured!"
    );
  }
}

async function getCategory(id) {
  try {
    const res = await categoryRepository.getCategoryById(id);
    return generateOutput(200, "Category getting sucess", res.rows);
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception
      return generateOutput(
        500,
        "Error in getting the category",
        error.message
      );
    }
    return generateOutput(
      400,
      "Error in getting the category",
      "An error occured!"
    );
  }
}

async function addCategory(data) {
  if (!data?.categoryName) {
    return generateOutput(400, "Validation Error", {
      statusCode: 400,
      message: "Validation Error",
    });
  }
  try {
    const res = await categoryRepository.getCategoryByName(data.categoryName);
    if (res.rowCount !== 0) {
      return generateOutput(400, "Category Already exists");
    }
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception
      return generateOutput(500, "Error in adding the category", error.message);
    }
    return generateOutput(
      400,
      "Error in adding the category",
      "An error occured!"
    );
  }
  const values = {
    categoryId: uuid.v4(),
    categoryName: data.categoryName,
  };
  try {
    const res = await categoryRepository.addCategory(values);
    return generateOutput(201, "Data added succesfully!", {
      statusCode: 201,
      category: values,
    });
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception
      return generateOutput(500, "Error in adding the category", error.message);
    }
    return generateOutput(
      400,
      "Error in adding the category",
      "An error occured!"
    );
  }
}

async function deleteCategory(id) {
  try {
    const res = await categoryRepository.deleteCategory(id);
    return generateOutput(200, "Category deleted succesfully!");
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception
      return generateOutput(
        500,
        "Error in deleting the category",
        error.message
      );
    }
    return generateOutput(
      400,
      "Error in deleting the category",
      "An error occured!"
    );
  }
}

module.exports = { addCategory, getCategory, getAllCategories, deleteCategory };
