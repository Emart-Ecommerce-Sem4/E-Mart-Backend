const yup = require("yup");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRespository = require("../repositories/userRepository");
const generateOutput = require("../utils/outputFactory");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

function generateAccessToken(userObj) {
  return jwt.sign(userObj, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });
}
const signInSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(8).max(15),
});
const signUpSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthday: yup.date().required(),
  email: yup.string().email().required(),
  birthday: yup.date().required(),

  postalCode: yup.string().required(),
  city: yup.string().required(),
  district: yup.string().required(),
  password: yup.string().required().min(8).max(15),
});

async function getUserDetails(userId) {
  try {
    const res = await userRespository.getCustomerDetails(userId);
    return generateOutput(200, "User fetched succesfully", {
      user: res.rows[0],
    });
  } catch (error) {
    return generateOutput(500, "Internal Server Error", error);
  }
}

async function getUserOrders(userId) {
  try {
    const res = await userRespository.getUserOrders(userId);
    return generateOutput(200, "UserOrders fetched succesfully", {
      userOrders: res.rows,
    });
  } catch (error) {
    return generateOutput(500, "Internal Server Error", error);
  }
}

async function signin(email, password) {
  try {
    await signInSchema.validate({ email: email, password: password });
  } catch (error) {
    return generateOutput(400, "Validation error", error.message);
  }
  try {
    const res = await userRespository.getUser(email);
    if (res.rowCount == 0) {
      return generateOutput(400, "User does not exist");
    }
    const user = res.rows[0];
    const userDetails = await userRespository.getCustomerDetails(user.user_id);
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, async (err, isMatch) => {
        if (err) {
          generateOutput(
            400,
            "Error in signining the user",
            "An error occured!"
          );
        }
        if (isMatch) {
          const userObj = { ...user, ...userDetails.rows[0] };
          delete userObj.password;
          const userData = {
            user_id: userObj?.user_id,
            user_role: userObj?.user_role,
            email: userObj?.email,
          };
          resolve(
            generateOutput(200, "User succesfully signin!", {
              user: { ...userObj },
              token: generateAccessToken(userData),
            })
          );
        } else {
          resolve(
            generateOutput(
              400,
              "Entered  Email or Password is Incorrect",
              "Entered  Email or Password is Incorrect"
            )
          );
        }
      });
    });
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception
      resolve(generateOutput(500, "Error in getting the user", error.message));
    }
    resolve(
      generateOutput(400, "Error in getting the user", "An error occured!")
    );
  }
}

async function forgotPassword(email) {
  try {
    const res = await userRespository.getUser(email);
    if (res.rowCount === 0) {
      return generateOutput(
        400,
        "User Not found for the email",
        "No user found"
      );
    } else {
      // Email sending proccess needed to implemented in here
      return generateOutput(
        200,
        "Email send to your inbox",
        "Password reset email send succesfully!"
      );
    }
  } catch (error) {
    return generateOutput(500, "Internal Server error", error);
  }
}

async function registerUser(values) {
  try {
    await signUpSchema.validate({
      ...values,
    });
  } catch (error) {
    return generateOutput(400, "Validation error", error.message);
  }
  try {
    const res = await userRespository.getUser(values.email);
    if (res.rowCount !== 0) {
      return generateOutput(400, "User Already exists", "User already exists");
    }
  } catch (error) {
    if (error instanceof InternalServerErrorException) {
      // Internal server error exception
      return generateOutput(
        500,
        "Error in registerering the user",
        error.message
      );
    }
    return generateOutput(
      400,
      "Error in registering the user",
      "An error occured!"
    );
  }
  const id = uuid.v4();
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, async (err, salt) => {
      if (err) {
        resolve(
          generateOutput(
            400,
            "Error in registering the user",
            "An error occured!"
          )
        );
      } else {
        bcrypt.hash(values.password, salt, async (err, hash) => {
          if (err) {
            resolve(
              generateOutput(
                400,
                "Error in registering the user",
                "An error occured!"
              )
            );
          }
          const user = {
            user_id: id,
            firstName: values.firstName,
            lastName: values.lastName,
            birthday: values.birthday,
            phoneNumber: values.phoneNumber,
            addressLine1: values.addressLine1,
            addressLine2: values.addressLine2,
            user_role: "CUSTOMER",
            email: values.email,
            city: values.city,
            district: values.district,
            postalCode: values.postalCode,
            password: hash,
          };
          try {
            await userRespository.registerUser(user);
            delete user.password;
            const userObj = {
              user_id: id,
              email: values.email,
              user_role: "CUSTOMER",
            };
            resolve(
              generateOutput(201, "User created sucessfully!", {
                user: user,
                token: generateAccessToken(userObj),
              })
            );
          } catch (error) {
            if (error instanceof InternalServerErrorException) {
              resolve(
                generateOutput(
                  500,
                  "Error in registerering the user",
                  error.message
                )
              );
            }
            resolve(
              generateOutput(
                400,
                "Error in registering the user",
                "Error occured!"
              )
            );
          }
        });
      }
    });
  });
}

module.exports = {
  getUserOrders,
  registerUser,
  signin,
  forgotPassword,
  getUserDetails,
};
