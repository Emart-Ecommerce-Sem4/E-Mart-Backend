const uuid = require("uuid");
const yup = require("yup");
const generateOutput = require("../utils/outputFactory");

const orderRepository = require("../repositories/orderRepository");

const orderAddSchema = yup.object().shape({
  userId: yup.string().required(),
  orderDate: yup.string().required(),
  itemCount: yup.number().required(),
  orderStatus: yup.string().required(),
  comments: yup.string(),
  paymentMethod: yup.string().required(),
  totalPrice: yup.number().required(),
});

const orderDeliverValidation = yup.object().shape({
  dispatchedDate: yup.string().required(),
  deliverId: yup.string().required(),
  orderId: yup.string().required(),
});

async function rejectOrder(values) {
  try {
    const res = await orderRepository.rejectOrder(values);
    return generateOutput(
      201,
      "Order rejected succesfully",
      "Rejection success"
    );
  } catch (error) {
    return generateOutput(500, "Internal Server Error", error);
  }
}

async function deliverOrder(values) {
  try {
    await orderDeliverValidation.validate({
      ...values,
    });
  } catch (error) {
    return generateOutput(400, "Validation error", { error: error.errors });
  }
  try {
    const res = await orderRepository.shipOrder(values);
    return generateOutput(
      201,
      "Product add to shipped section",
      "Added succesfully!"
    );
  } catch (error) {
    return generateOutput(500, "Internal Server Error", error);
  }
}

async function getOrderProducts(orderId) {
  try {
    const res = await orderRepository.getOrderProducts(orderId);
    return generateOutput(200, "Products fetched succesfully", {
      products: res.rows,
    });
  } catch (error) {
    return generateOutput(500, "Internal Server Error", error);
  }
}

async function getOrdersAccordingToStatus(status) {
  try {
    const res = await orderRepository.getOrdersAccordingToStatus(status);
    return generateOutput(200, "Orders fetched succesfully!", {
      orders: res.rows,
    });
  } catch (error) {
    return generateOutput(500, "Internal Server Error", error);
  }
}

async function addOrder(values) {
  try {
    await orderAddSchema.validate({
      ...values,
    });
  } catch (error) {
    return generateOutput(400, "Validation Error", error.errors);
  }
  const order = {
    id: uuid.v4(),
    ...values,
  };
  try {
    const res = await orderRepository.addOrder(order);
    return generateOutput(201, "Order adder succesfully!", { order });
  } catch (error) {
    return generateOutput(500, "Error occured while adding the order", error);
  }
}

module.exports = {
  addOrder,
  getOrdersAccordingToStatus,
  getOrderProducts,
  deliverOrder,
  rejectOrder,
};
