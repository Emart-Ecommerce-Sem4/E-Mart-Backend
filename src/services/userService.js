const yup = require("yup");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRespository = require("../repositories/userRepository");
const generateOutput = require("../utils/outputFactory");

function generateAccessToken(userObj) {
  return jwt.sign(userObj, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });
}

const signUpSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(15),
  userType: yup.string().required(),
});

async function registerUser(values) {
  try {
    await signUpSchema.validate({
      name: values.name,
      email: values.email,
      password: values.password,
      userType: values.userType,
    });
  } catch (error) {
    return generateOutput(400, "Validation error", error);
  }
  try {
    const res = await userRespository.getUser(values.email);
    if (res.rowCount !== 0) {
      return generateOutput(400, "User Already exixts", "User already exists");
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
        bcrypt.hash(password, salt, async (err, hash) => {
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
            id: id,
            email: values.email,
            password: hash,
            userType: values.userType,
            name: values.name,
          };
          try {
            await userRespository.registerUser(user);
            delete user.password;
            resolve(
              generateOutput(201, "User created sucessfully!", {
                user: { user },
                token: generateAccessToken(user),
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
                "An error occured!"
              )
            );
          }
        });
      }
    });
  });
}

module.exports = { registerUser };
