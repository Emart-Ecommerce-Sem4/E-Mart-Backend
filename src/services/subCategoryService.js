const uuid = require("uuid");
const yup = require("yup");

const subCategoryRepository = require("../repositories/subCategoryRepository");
const generateOutput = require("../utils/outputFactory");

const subCategoryAddSchema = yup.object().shape({
  categoryId: yup.string().required(),
  name: yup.string().required(),
});

async function addSubCategory(values) {
  try {
    await subCategoryAddSchema.validate({
      ...values,
    });
  } catch (error) {
    return generateOutput(400, "Validation Error!", error.errors);
  }
  try {
    const res = await subCategoryRepository.getSubCategoryByName(values.name);
    if (res.rowCount !== 0) {
      return generateOutput(400, "Sub Category Already Exists", {
        cateogry: res.rows[0],
      });
    }
  } catch (error) {
    return generateOutput(400, "Error in reading the database", error);
  }
  const category = {
    id: uuid.v4(),
    ...values,
  };
  try {
    const res = await subCategoryRepository.addSubCategory(category);
    return generateOutput(201, "Sub category added succesfully!", { category });
  } catch (error) {
    return generateOutput(500, "Error in adding the sub category", error);
  }
}

module.exports = {
  addSubCategory,
};
