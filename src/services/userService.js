const userRespository = require("../repositories/userRepository");

async function registerUser(values){
    userRespository.registerUser({name:"Name",password:"Password"});
}

module.exports = {registerUser};
