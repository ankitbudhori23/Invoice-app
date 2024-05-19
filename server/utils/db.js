const mongoose = require("mongoose");

const URI =
  "mongodb+srv://ankit:ankit@atlascluster.gxvhhpj.mongodb.net/invoice?retryWrites=true&w=majority";
const dbconnect = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DB Connection successful");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbconnect;
